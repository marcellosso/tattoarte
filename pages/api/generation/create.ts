import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { User } from '@prisma/client';

import { ParamsType } from '@/types';
import Replicate from 'replicate';
import { v4 } from 'uuid';
import { prisma } from '@/utils/use-prisma';
import axios from 'axios';

import fs from 'fs';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

// long vertical tattoo flash design of a skull with flowers coming out of its head, in black and white ink tattoo style, clean white background
const DEFAULT_PROMPT = 'HD On a flat white background, create a tattoo art';

module.exports = withApiAuthRequired(async (req, res) => {
  try {
    let prompt = DEFAULT_PROMPT;
    let { params, user } = req.body as { params: ParamsType; user: User };

    let newCredits = user.credits || 0;

    if (!user.subscribed) {
      let creditsToDeduce = 1;
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
    // if (params.isHD) prompt += `, HD`;

    const output = (await replicate.run(
      'prompthero/openjourney:9936c2001faa2194a261c01381f90e65261879985476014a0a37a334593a05eb',
      {
        input: {
          num_outputs: 4,
          prompt:
            'mdjrny-v4 style a highly detailed matte painting of a man on a hill watching a rocket launch in the distance by studio ghibli, makoto shinkai, by artgerm, by wlop, by greg rutkowski, volumetric lighting, octane render, 4 k resolution, trending on artstation, masterpiece',
        },
      }
    )) as string[];

    const imageNames = [] as string[];

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
      })
    );

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
    // console.log(err);
    res.status(500).send(err);
  }
});
