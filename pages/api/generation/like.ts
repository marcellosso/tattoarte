import { prisma } from '@/utils/use-prisma';
import type { Like } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { clerkClient, getAuth } from '@clerk/nextjs/server';

module.exports = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId } = await getAuth(req);
    const { externalId } = await clerkClient.users.getUser(userId ?? '');

    const { id } = req.body as { id: string };

    const data = { generationid: id, userId: externalId } as Like;

    const like = await prisma.like.findUnique({
      where: { userId_generationid: data },
    });

    if (like == null) await prisma.like.create({ data });
    else await prisma.like.delete({ where: { userId_generationid: data } });

    res.status(200).json({ liked: true });
  } catch (err) {
    res.status(500).send(err);
  }
};
