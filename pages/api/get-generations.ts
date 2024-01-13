import { prisma } from '@/utils/use-prisma';
import { clerkClient } from '@clerk/nextjs';
import { Prisma } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

module.exports = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { generationCursor, generationStyle, limit } = req.query;
    const users = await clerkClient.users.getUserList();

    const prismaCallObj = {
      where: {
        is_private: false,
        style: (generationStyle || undefined) as string,
      },
      take: Number(limit) ?? 24,
      orderBy: [
        {
          createdAt: 'desc',
        },
        {
          id: 'desc',
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
          author: {
            select: { id: true, name: true },
          },
          _count: {
            select: { likes: true, bookmarks: true },
          },
        },
      })) || [];

    let generations = [];

    generations = generationsResp.map((generation) => {
      const user = users.find(
        (user) => user.externalId === generation?.author?.id
      );
      return {
        id: generation.id,
        style: generation.style,
        prompt: generation.prompt,
        imageUrl: generation.imageUrl,
        createdAt: generation.createdAt,
        authorId: generation?.author?.id,
        authorName: generation?.author?.name,
        authorImageUrl: user?.imageUrl,
        likes: generation._count.likes,
        bookmarks: generation._count.bookmarks,
      };
    });

    res.json({ generations });
  } catch (err) {
    res.send(err);
  }
};
