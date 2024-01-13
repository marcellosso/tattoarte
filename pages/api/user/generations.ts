import { prisma } from '@/utils/use-prisma';
import { clerkClient, getAuth } from '@clerk/nextjs/server';
import type { Prisma } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

type GenerationWithAuthor = Prisma.GenerationGetPayload<{
  include: {
    author: true;
    _count: { select: { likes: true; bookmarks: true } };
  };
}>;

module.exports = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId } = await getAuth(req);
    const { externalId } = await clerkClient.users.getUser(userId ?? '');

    const { id, tab, cursor } = req.query as {
      id: string;
      tab: 'all' | 'liked' | 'bookmarked';
      cursor?: string;
    };

    const currentUserId = id === 'me' ? externalId ?? '' : id;

    const users = await clerkClient.users.getUserList({
      externalId: [currentUserId],
    });

    const prismaCallObj = {
      take: 15,
      orderBy: [
        {
          createdAt: 'desc',
        },
        {
          id: 'desc',
        },
      ],
      cursor: cursor ? { id: cursor } : undefined,
      skip: cursor ? 1 : undefined,
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
          select: {
            likes: true,
            bookmarks: true,
          },
        },
      },
    } as Prisma.GenerationFindManyArgs;

    const userInfo = await prisma.user.findUnique({
      where: {
        id: currentUserId,
      },
      select: {
        generations: {
          ...prismaCallObj,
        },
        likes: tab === 'liked',
        bookmarks: tab === 'bookmarked',
      },
    });

    let generations = (userInfo?.generations ?? []) as GenerationWithAuthor[];

    if (tab !== 'all') {
      const genField = tab === 'liked' ? 'likes' : 'bookmarks';
      const genIdField = tab === 'liked' ? 'generationid' : 'generationId';
      const newGenerations = await prisma.generation.findMany({
        where: {
          id: {
            in: (userInfo?.[genField] || []).map(
              (like) => like[genIdField as keyof typeof like]
            ),
          },
        },
        ...prismaCallObj,
      });

      generations = newGenerations as GenerationWithAuthor[];
    }

    const mappedGenerations = (generations || []).map((generation) => {
      const user = users[0];
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

    res.json({
      generations: mappedGenerations,
    });
  } catch (err) {
    res.send(err);
  }
};
