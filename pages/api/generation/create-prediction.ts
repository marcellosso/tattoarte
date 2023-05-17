import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { User } from '@prisma/client';

import { ParamsType } from '@/types';
import Replicate from 'replicate';
import axios from 'axios';

import { englishTattooStyles } from '@/assets/tattoo-styles';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN || '',
});

const PREFIX_DEFAULT_PROMPT = 'mdjrny-v4 style tattoo flash design of ';
const SUFFIX_DEFAULT_PROMPT = ', clean white background, HD, without borders';

module.exports = withApiAuthRequired(async (req, res) => {
  try {
    let prompt = '';
    let { user } = req.body as { user: User };
    const { params } = req.body as { params: ParamsType };

    let newCredits = user.credits || 0;

    if (!user.subscribed) {
      let creditsToDeduce = 1;
      if (params.isPrivate && !user.freeTrial) creditsToDeduce += 2;

      if (user.credits == 0 || (user.credits || 0) < creditsToDeduce) {
        throw 'Você não possui créditos suficientes para gerar uma arte.';
      }

      newCredits = Math.max(0, (user.credits || 0) - creditsToDeduce);
    }

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

    prompt = PREFIX_DEFAULT_PROMPT + prompt + SUFFIX_DEFAULT_PROMPT;

    const { id } = await replicate.predictions.create({
      version:
        '9936c2001faa2194a261c01381f90e65261879985476014a0a37a334593a05eb',
      input: {
        prompt,
        num_outputs: 4,
      },
    });

    // const id = 'f5gsyvvbsnfljml3nxal5kquoy';

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
