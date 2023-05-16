import { prisma } from '@/utils/use-prisma';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import type { Like } from '@prisma/client';

module.exports = withApiAuthRequired(async (req, res) => {
  try {
    const session = await getSession(req, res);
    const sessionUser = session?.user;
    const userId = sessionUser?.sub.split('|')[1];

    const { id } = req.body as { id: string };

    const data = { generationid: id, userId: userId } as Like;

    const like = await prisma.like.findUnique({
      where: { userId_generationid: data },
    });

    if (like == null) await prisma.like.create({ data });
    else await prisma.like.delete({ where: { userId_generationid: data } });

    res.status(200).json({ liked: true });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});
