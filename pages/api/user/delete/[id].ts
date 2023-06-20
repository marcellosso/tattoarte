import { prisma } from '@/utils/use-prisma';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { Role } from '@prisma/client';

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
});
