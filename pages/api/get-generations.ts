import { prisma } from '@/utils/use-prisma';
import { Prisma } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

module.exports = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { generationCursor, generationStyle } = req.query;

    const prismaCallObj = {
      where: {
        is_private: false,
        style: (generationStyle || undefined) as string,
      },
      take: 24,
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    } as Prisma.GenerationFindManyArgs;

    if (generationCursor) {
      prismaCallObj.cursor = {
        id: generationCursor as string,
      };
      prismaCallObj.skip = 1;
    }

    const generations = (await prisma.generation.findMany(prismaCallObj)) || [];

    res.json({ generations });
  } catch (err) {
    res.send(err);
  }
};
