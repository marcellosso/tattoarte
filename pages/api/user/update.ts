import { prisma } from '@/utils/use-prisma';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { Features, Role, User } from '@prisma/client';

module.exports = withApiAuthRequired(async (req, res) => {
  const session = await getSession(req, res);
  const sessionUser = session?.user || {};

  const user = await prisma.user.findUnique({
    where: {
      email: sessionUser.email as string,
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
});
