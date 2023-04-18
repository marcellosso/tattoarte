import prisma from '@/utils/use-prisma';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { User } from '@prisma/client';
import { Configuration, OpenAIApi } from 'openai';

import fs, { WriteStream } from 'fs';
import { v4 } from 'uuid';
import { ParamsType } from '@/types';
('uuid');

const IMAGE_NAME_PATTERN = '(?=img).+?(?=.png)';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// long vertical tattoo flash design of a skull with flowers coming out of its head, in black and white ink tattoo style, clean white background
const DEFAULT_PROMPT = 'On a flat white background, create a tattoo art';

module.exports = withApiAuthRequired(async (req, res) => {
  try {
    let prompt = DEFAULT_PROMPT;
    let { params, user } = req.body as { params: ParamsType; user: User };

    let newCredits = user.credits || 0;

    if (!user.subscribed) {
      let creditsToDeduce = 1;
      if (params.isHD) creditsToDeduce += 2;
      if (params.isPrivate) creditsToDeduce += 2;

      if (user.credits == 0 || (user.credits || 0) < creditsToDeduce) {
        throw 'Você não possui créditos suficientes para gerar uma arte.';
      }

      newCredits = Math.max(0, (user.credits || 0) - creditsToDeduce);
    }

    if (params.prompt) prompt += `: ${params.prompt}`;
    if (params.colorsStyle) prompt += `, ${params.colorsStyle},`;
    if (params.tattooStyle) prompt += ` ${params.tattooStyle} style`;
    if (params.artistInspiration)
      prompt += ` inspired by ${params.artistInspiration}`;
    if (params.colors)
      prompt += ` using these colors: ${params.colors.join(' ')}`;

    // const response = await openai.createImage({
    //   prompt: prompt,
    //   n: 1,
    //   size: params.isHD ? '1024x1024' : '512x512',
    //   response_format: 'b64_json',
    // });
    // const images = response.data.data;

    const images = [
      {
        b64_json: '/images/generated/img-test1.png',
      },
      {
        b64_json: '/images/generated/img-test2.png',
      },
      {
        b64_json: '/images/generated/img-test3.png',
      },
      {
        b64_json: '/images/generated/img-test4.png',
      },
    ];

    // const imageNames = [] as string[];

    const imageNames = ['img-test', 'img-test2', 'img-test3', 'img-test4'];

    images.forEach(async (image, idx) => {
      // const imageName = v4();
      const imageName = imageNames[idx];

      // await fs.writeFileSync(
      //   `public/images/generated/${imageName}.png`,
      //   image.b64_json as string,
      //   'base64'
      // );

      // imageNames.push(imageName);

      const generationObj = {
        prompt: params.prompt,
        style: params.tattooStyle,
        image_name: imageName,
        is_hd: params.isHD || false,
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
    });

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
