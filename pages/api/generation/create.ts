import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { User } from '@prisma/client';

import { ParamsType } from '@/types';
import Replicate from 'replicate';
import { v4 } from 'uuid';
import { prisma } from '@/utils/use-prisma';
import axios from 'axios';

import fs from 'fs';
import { englishTattooStyles } from '@/assets/tattoo-styles';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

const PREFIX_DEFAULT_PROMPT = 'mdjrny-v4 style tattoo flash design of ';
const SUFFIX_DEFAULT_PROMPT = ', clean white background, HD, without borders';

module.exports = withApiAuthRequired(async (req, res) => {
  try {
    let prompt = '';
    let { params, user } = req.body as { params: ParamsType; user: User };

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

    const output = (await replicate.run(
      'prompthero/openjourney:9936c2001faa2194a261c01381f90e65261879985476014a0a37a334593a05eb',
      {
        input: {
          num_outputs: 4,
          prompt,
        },
      }
    )) as string[];

    let imageNames = [] as string[];

    if (!user.freeTrial) {
      await Promise.all(
        output.map(async (image, idx) => {
          const imageName = v4();

          const imageBufferResponse = await axios.get(image, {
            responseType: 'arraybuffer',
          });
          const imageB64 = Buffer.from(
            imageBufferResponse.data,
            'binary'
          ).toString('base64');

          await fs.writeFileSync(
            `public\\images\\generated\\${imageName}.png`,
            imageB64 as string,
            'base64'
          );

          imageNames.push(imageName);

          const generationObj = {
            prompt: params.prompt,
            style: params.tattooStyle,
            image_name: imageName,
            is_private: params.isPrivate || false,
          };

          await prisma.generation.create({
            data: {
              ...generationObj,
              authorName: user.name as string,
              author: {
                connect: {
                  id: user.id,
                },
              },
            },
          });
        })
      );
    } else {
      imageNames = output;
    }

    user = await prisma.user.update({
      where: {
        email: user.email!,
      },
      data: {
        credits: newCredits,
        generationCount: (user.generationCount || 0) + 1,
      },
    });

    res.status(200).json({ images: imageNames, newUserData: user });
  } catch (err) {
    res.status(500).send(err);
  }
});
