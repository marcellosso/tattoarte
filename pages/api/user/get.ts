import { prisma } from '@/utils/use-prisma';
import { clerkClient, getAuth } from '@clerk/nextjs/server';
import { NextApiRequest, NextApiResponse } from 'next';

module.exports = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId } = await getAuth(req);
    const { externalId } = await clerkClient.users.getUser(userId ?? '');

    const { id } = req.query as { id?: string };
    const users = await clerkClient.users.getUserList({
      externalId: [id ?? externalId ?? ''],
    });
    const user = users[0];

    const userInfo = await prisma.user.findUnique({
      where: {
        id: id ?? externalId ?? '',
      },
      select: {
        name: true,
        email: true,
        credits: true,
        hasBronzeCoin: true,
        hasSilverCoin: true,
        hasGoldCoin: true,
        hasPlatinumCoin: true,
        hasDiamondCoin: true,

        _count: {
          select: {
            likes: true,
            generations: true,
            bookmarks: true,
          },
        },
      },
    });

    res.json({
      userInfo: {
        ...userInfo,
        imageUrl: user?.imageUrl,
        userLikesCount: userInfo?._count.likes,
        userBookmarksCount: userInfo?._count.bookmarks,
      },
    });
  } catch (err) {
    res.send(err);
  }
};
