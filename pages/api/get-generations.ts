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

    const generationsResp =
      (await prisma.generation.findMany({
        ...prismaCallObj,
        select: {
          id: true,
          style: true,
          prompt: true,
          imageUrl: true,
          createdAt: true,
          _count: {
            select: { likes: true, bookmarks: true },
          },
        },
      })) || [];

    const generations = generationsResp.map((generation) => {
      return {
        id: generation.id,
        style: generation.style,
        prompt: generation.prompt,
        imageUrl: generation.imageUrl,
        createdAt: generation.createdAt,
        likes: generation._count.likes,
        bookmarks: generation._count.bookmarks,
      };
    });

    res.json({ generations });
  } catch (err) {
    res.send(err);
  }
};
