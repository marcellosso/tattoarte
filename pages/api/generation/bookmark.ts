import { prisma } from '@/utils/use-prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { clerkClient, getAuth } from '@clerk/nextjs/server';

module.exports = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId } = await getAuth(req);
    const { externalId } = await clerkClient.users.getUser(userId ?? '');

    const { id } = req.body as { id: string };

    const data = { generationId: id, userId: externalId ?? '' };

    const bookmark = await prisma.bookmark.findUnique({
      where: { userId_generationId: data },
    });

    if (bookmark == null) await prisma.bookmark.create({ data });
    else await prisma.bookmark.delete({ where: { userId_generationId: data } });

    res.status(200).json({ bookmarked: true });
  } catch (err) {
    res.status(500).send(err);
  }
};
