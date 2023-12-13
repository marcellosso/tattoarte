import { prisma } from '@/utils/use-prisma';
import { Role } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { clerkClient, getAuth } from '@clerk/nextjs/server';

module.exports = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = await getAuth(req);
  const { externalId } = await clerkClient.users.getUser(userId ?? '');

  const user = await prisma.user.findUnique({
    where: {
      id: externalId ?? '',
    },
  });

  if (user?.role != Role.ADMIN)
    res.status(401).send('You need to be an admin to do this action');

  const { id } = req.query as { id: string };
  if (!id) res.status(500).send('You need to provide an ID to be deleted');

  try {
    await prisma.user.delete({
      where: {
        id,
      },
    });

    res.status(200).send('User deleted');
  } catch (err) {
    res.status(500).send(err);
  }
};
