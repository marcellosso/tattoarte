import prisma from '@/utils/use-prisma';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { User } from '@prisma/client';
import { Configuration, OpenAIApi } from 'openai';

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
      const creditsToDeduce = params.isHD ? 3 : 1;

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
    // });
    // const images = response.data.data;

    const images = [
      {
        url: '/images/img-test.png',
      },
      {
        url: '/images/img-test2.png',
      },
      {
        url: '/images/img-test3.png',
      },
      {
        url: '/images/img-test4.png',
      },
    ];

    images.forEach(async (image, idx) => {
      const imageName = image.url.match(IMAGE_NAME_PATTERN)?.[0] || '';

      if (imageName) {
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
            author: {
              connect: {
                id: user.id,
              },
            },
          },
        });
      }
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

    res
      .status(200)
      .json({ images: images.map((image) => image.url), newUserData: user });
  } catch (err) {
    res.status(500).send(err);
  }
});
