import { prisma } from '@/utils/use-prisma';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';

module.exports = withApiAuthRequired(async (req, res) => {
  try {
    const session = await getSession(req, res);
    const sessionUser = session?.user;
    const userId = sessionUser?.sub.split('|')[1];

    const { id } = req.body as { id: string };

    const data = { generationId: id, userId: userId };

    const bookmark = await prisma.bookmark.findUnique({
      where: { userId_generationId: data },
    });

    if (bookmark == null) await prisma.bookmark.create({ data });
    else await prisma.bookmark.delete({ where: { userId_generationId: data } });

    res.status(200).json({ bookmarked: true });
  } catch (err) {
    res.status(500).send(err);
  }
});
