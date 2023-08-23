import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { User, Status } from '@prisma/client';
import { prisma } from '@/utils/use-prisma';
import { client, metadata } from '@/utils/use-generation';

import { ParamsType } from '@/types';

import { englishTattooStyles } from '@/assets/tattoo-styles';
import {
  buildGenerationRequest,
  executeGenerationRequest,
  onGenerationComplete,
} from '@/stability-sdk/helpers';
import * as Generation from '@/stability-sdk/generation_pb';
import { v4 } from 'uuid';
import { S3 } from 'aws-sdk';
import axios from 'axios';

const SAMPLE_SIZE = 4;

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  signatureVersion: 'v4',
});

module.exports = withApiAuthRequired(async (req, res) => {
  try {
    let prompt = process.env.PREFIX_DEFAULT_PROMPT as string;
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

    if (params.tattooStyle)
      prompt += `, ${englishTattooStyles[params.tattooStyle]}`;

    if (params.prompt) {
      let localPrompt = params.prompt;
      if (params.prompt.length > maxPromptLenght)
        localPrompt = localPrompt.slice(0, maxPromptLenght);

      const response = await axios.post(
        `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${process.env.TRANSLATE_API_KEY}&text=${localPrompt}&lang=pt-en&format=plain`
      );
      const translatedPrompt = response.data.text[0];

      prompt += `, ${translatedPrompt}`;
    }

    if (params.colorsStyle) prompt += `, ${params.colorsStyle}`;
    if (params.artistInspiration)
      prompt += `, art by ${params.artistInspiration}`;

    const baseGenerationParams = {
      prompts: [
        {
          text: prompt,
        },
      ],
      samples: SAMPLE_SIZE,
      cfgScale: 8,
      steps: 30,
      width: 512,
      height: 512,
      sampler: Generation.DiffusionSampler.SAMPLER_K_DPMPP_2M,
    };

    let request = null;

    if (params.baseImage) {
      const imageStrength = 1;
      request = buildGenerationRequest('stable-diffusion-xl-beta-v2-2-2', {
        type: 'image-to-image',
        stepScheduleStart: 1 - imageStrength,
        initImage: Buffer.from(params.baseImage, 'base64'),
        ...baseGenerationParams,
      });
    } else {
      request = buildGenerationRequest('stable-diffusion-xl-beta-v2-2-2', {
        type: 'text-to-image',
        ...baseGenerationParams,
      });
    }

    const generationObj = {
      prompt: params.prompt,
      authorName: user.name as string,
      style: params.tattooStyle,
      is_private: params.isPrivate || false,
      author: (!user.freeTrial
        ? {
            connect: {
              id: user.id,
            },
          }
        : '') as any,
    };

    const generationIds = [] as string[];

    for (let i = 0; i < SAMPLE_SIZE; i++) {
      const generation = await prisma.generation.create({
        data: { ...generationObj, status: Status.LOADING },
      });

      generationIds.push(generation.id);
    }

    executeGenerationRequest(client, request, metadata)
      .then(async (response) => {
        const artifacts = await onGenerationComplete(response);

        artifacts.map(async (artifact, idx) => {
          const imageName = v4();
          const imageBase64 = artifact.getBinary_asU8();
          const s3UploadResponse = await s3
            .upload({
              Bucket: process.env.AWS_BUCKET_NAME ?? '',
              Key: `generations/${user.id}/${imageName}.png`,
              Body: imageBase64,
              ACL: 'public-read',
            })
            .promise();
          const imageUrl = s3UploadResponse.Location;
          const generationId = generationIds[idx];

          await prisma.generation.update({
            where: {
              id: generationId,
            },
            data: {
              imageUrl,
              imageName,
              status: Status.COMPLETED,
            },
          });
        });
      })
      .catch((error) => {
        console.error('Failed to make request:', error);
      });

    const newUserGenerationCount = (user.generationCount || 0) + 1;

    user = {
      ...user,
      credits: newCredits,
      generationCount: newUserGenerationCount,
    };

    res.status(200).json({ newUserData: user, generationIds });
  } catch (err) {
    res.status(500).send(err);
  }
});
