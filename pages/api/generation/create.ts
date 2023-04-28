import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { User } from '@prisma/client';

import { ParamsType } from '@/types';
import Replicate from 'replicate';
import { v4 } from 'uuid';
import { prisma } from '@/utils/use-prisma';
import axios from 'axios';

import S3 from 'aws-sdk/clients/s3';

import { englishTattooStyles } from '@/assets/tattoo-styles';

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  signatureVersion: 'v4',
});

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
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

    const output = (await replicate.run(
      'prompthero/openjourney:9936c2001faa2194a261c01381f90e65261879985476014a0a37a334593a05eb',
      {
        input: {
          num_outputs: 4,
          prompt,
        },
      }
    )) as string[];

    // const output = [
    //   'https://replicate.delivery/pbxt/Ufj2XWeDiwmlq0bnCWlbDV7fHpQRZpMzKSK76SMDpvWTbpphA/out-0.png',
    // ];

    const images = [] as string[];

    await Promise.all(
      output.map(async (image, idx) => {
        const imageName = v4();

        const imageResponse = await axios.get(image, {
          responseType: 'arraybuffer',
        });

        const s3UploadResponse = await s3
          .upload({
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: `generations/${user.id}/${imageName}.png`,
            Body: imageResponse.data,
            ACL: 'public-read',
          })
          .promise();

        const imageUrl = s3UploadResponse.Location;

        images.push(imageUrl);

        const generationObj = {
          prompt: params.prompt,
          style: params.tattooStyle,
          imageName: imageName,
          imageUrl,
          is_private: params.isPrivate || false,
        };

        if (!user.freeTrial) {
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
        } else {
          await prisma.generation.create({
            data: {
              ...generationObj,
              authorName: user.name as string,
            },
          });
        }
      })
    ).catch((err) => {
      throw err;
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

    res.status(200).json({ images, newUserData: user });
  } catch (err) {
    res.status(500).send(err);
  }
});
