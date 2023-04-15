import prisma from '@/utils/use-prisma';
import { getSession, Session, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { PrismaClient, User } from '@prisma/client';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

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

    const response = await openai.createImage({
      prompt: prompt,
      n: 4,
      size: params.isHD ? '1024x1024' : '512x512',
    });
    const images = response.data.data;
    // const images = [
    //   {
    //     url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-0RBw64FuuARG8AILCZsehW44/user-7iI0larPkwQ0Rd6UZcJkXaip/img-KALo6QKMF2F76STYG15L0Egj.png?st=2023-04-15T04%3A28%3A51Z&se=2023-04-15T06%3A28%3A51Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-04-15T02%3A38%3A55Z&ske=2023-04-16T02%3A38%3A55Z&sks=b&skv=2021-08-06&sig=H6nnq3Nrpq7x2U3fYHzGQ1lqLj2zRJo/zmKmSwonUVA%3D',
    //   },
    //   {
    //     url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-0RBw64FuuARG8AILCZsehW44/user-7iI0larPkwQ0Rd6UZcJkXaip/img-nWDQ4aL52nn5pt551PN1pvvc.png?st=2023-04-15T04%3A28%3A51Z&se=2023-04-15T06%3A28%3A51Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-04-15T02%3A38%3A55Z&ske=2023-04-16T02%3A38%3A55Z&sks=b&skv=2021-08-06&sig=HyhfYEfaUxEWs%2B9xHsgj/%2BV3d23KO7spgmtS3x0sQXs%3D',
    //   },
    //   {
    //     url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-0RBw64FuuARG8AILCZsehW44/user-7iI0larPkwQ0Rd6UZcJkXaip/img-nWDQ4aL52nn5pt551PN1pvvc.png?st=2023-04-15T04%3A28%3A51Z&se=2023-04-15T06%3A28%3A51Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-04-15T02%3A38%3A55Z&ske=2023-04-16T02%3A38%3A55Z&sks=b&skv=2021-08-06&sig=HyhfYEfaUxEWs%2B9xHsgj/%2BV3d23KO7spgmtS3x0sQXs%3D',
    //   },
    //   {
    //     url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-0RBw64FuuARG8AILCZsehW44/user-7iI0larPkwQ0Rd6UZcJkXaip/img-nWDQ4aL52nn5pt551PN1pvvc.png?st=2023-04-15T04%3A28%3A51Z&se=2023-04-15T06%3A28%3A51Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-04-15T02%3A38%3A55Z&ske=2023-04-16T02%3A38%3A55Z&sks=b&skv=2021-08-06&sig=HyhfYEfaUxEWs%2B9xHsgj/%2BV3d23KO7spgmtS3x0sQXs%3D',
    //   },
    // ];

    res
      .status(200)
      .json({ images: images.map((image) => image.url), newUserData: user });
  } catch (err) {
    res.status(500).send(err);
  }
});
