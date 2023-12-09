import { prisma } from '@/utils/use-prisma';
import { Features, Role, User } from '@prisma/client';
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

  const { updatedUser, updatedFeatures } = req.body as {
    updatedUser: User;
    updatedFeatures: Features;
  };

  try {
    const currentUser = await prisma.user.findUnique({
      where: { id: updatedUser.id },
      select: {
        features: true,
      },
    });

    const featuresPayload = {} as Record<string, unknown>;
    if (currentUser?.features) {
      featuresPayload.features = {
        update: { ...updatedFeatures },
      };
    } else {
      featuresPayload.features = {
        create: { ...updatedFeatures },
      };
    }

    await prisma.user.update({
      where: {
        id: updatedUser.id,
      },
      data: {
        ...updatedUser,
        ...featuresPayload,
      },
    });

    res.status(200).send('User updated');
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
