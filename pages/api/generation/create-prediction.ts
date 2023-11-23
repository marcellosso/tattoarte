import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { User } from '@prisma/client';

import { ParamsType } from '@/types';
import Replicate from 'replicate';
import axios from 'axios';

import { englishTattooStyles } from '@/assets/tattoo-styles';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN || '',
});

module.exports = withApiAuthRequired(async (req, res) => {
  try {
    let { user } = req.body as { user: User };
    const { params } = req.body as { params: ParamsType };
    let prompt = '';

    let newCredits = user.credits || 0;

    let creditsToDeduce = 1;
    if (params.isPrivate && !user.freeTrial) creditsToDeduce += 2;

    if (user.credits == 0 || (user.credits || 0) < creditsToDeduce) {
      throw 'Você não possui créditos suficientes para gerar uma arte.';
    }

    newCredits = Math.max(0, (user.credits || 0) - creditsToDeduce);

    let maxPromptLenght = 500;

    if (user.freeTrial) maxPromptLenght = 100;
    else if (!user.subscribed) maxPromptLenght = 250;

    if (params.prompt) {
      let localPrompt = params.prompt;
      if (params.prompt.length > maxPromptLenght)
        localPrompt = localPrompt.slice(0, maxPromptLenght);

      const response = await axios.post(
        `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${process.env.TRANSLATE_API_KEY}&text=${localPrompt}&lang=pt-en&format=plain`
      );
      const translatedPrompt = response.data.text[0];

      prompt += `${translatedPrompt}`;
    }
    if (params.tattooStyle)
      prompt += `, in ${englishTattooStyles[params.tattooStyle]} tattoo style`;
    if (params.colorsStyle) prompt += `, ${params.colorsStyle}`;
    if (params.artistInspiration)
      prompt += `, art by ${params.artistInspiration}`;

    prompt =
      (process.env.PREFIX_DEFAULT_PROMPT ?? '') +
      prompt +
      process.env.SUFFIX_DEFAULT_PROMPT;

    prompt =
      params.aiVersion == 'prime'
        ? prompt
        : process.env.CLASSIC_VERSION_INITIAL_PROMPT +
          prompt +
          ', HD, without borders';

    const aiVersionMap = {
      classic:
        '9936c2001faa2194a261c01381f90e65261879985476014a0a37a334593a05eb',
      prime: '39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b',
    } as Record<ParamsType['aiVersion'], string>;

    let inputParams = {
      prompt,
      num_outputs: 4,
    } as object;

    if (params.aiVersion == 'prime') {
      inputParams = {
        ...inputParams,
        negative_prompt: 'borders',
        disable_safety_checker: true,
        width: 768,
        height: 768,
        num_inference_steps: 30,
        refine: 'expert_ensemble_refiner',
      };
    }

    const { id } = await replicate.predictions.create({
      version: aiVersionMap[params.aiVersion],
      input: inputParams,
    });

    const newUserGenerationCount = (user.generationCount || 0) + 1;

    user = {
      ...user,
      credits: newCredits,
      generationCount: newUserGenerationCount,
    };

    res.status(200).json({ predictionId: id, newUserData: user });
  } catch (err) {
    res.status(500).send(err);
  }
});
