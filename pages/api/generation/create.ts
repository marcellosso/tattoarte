import prisma from '@/utils/use-prisma';
import { getSession, Session, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { PrismaClient, User } from '@prisma/client';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// long vertical tattoo flash design of a skull with flowers coming out of its head, in black and white ink tattoo style, clean white background
const DEFAULT_PROMPT = 'On a flat white background, create a tattoo art';

module.exports = withApiAuthRequired(async (req, res) => {
  try {
    const {
      user: { email },
    } = (await getSession(req, res)) as Session;

    let user = (await prisma.user.findUnique({
      where: {
        email,
      },
    })) as User;

    let prompt = DEFAULT_PROMPT;
    const params = req.body as ParamsType;

    if (!user.subscribed) {
      const creditsToDeduce = params.isHD ? 3 : 1;

      if (user.credits == 0 || (user.credits || 0) < creditsToDeduce) {
        throw 'Você não possui créditos suficientes para gerar uma arte.';
      }

      const newCredits = Math.max(0, (user.credits || 0) - creditsToDeduce);

      user = await prisma.user.update({
        where: {
          email,
        },
        data: {
          credits: newCredits,
          generationCount: (user.generationCount || 0) + 1,
        },
      });
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
    //   n: 4,
    //   size: params.isHD ? '1024x1024' : '512x512',
    // });
    // const images = response.data.data;
    const images = [
      {
        url: '/images/test.png',
      },
      {
        url: '/images/test.png',
      },
      {
        url: '/images/test.png',
      },
      {
        url: '/images/test.png',
      },
    ];

    res
      .status(200)
      .json({ images: images.map((image) => image.url), newUserData: user });
  } catch (err) {
    res.status(500).send(err);
  }
});
