import { prisma } from '@/utils/use-prisma';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { Status } from '@prisma/client';

module.exports = withApiAuthRequired(async (req, res) => {
  try {
    const { generationIds } = req.body as { generationIds: string[] };

    const generations = await prisma.generation.findMany({
      where: {
        id: { in: generationIds },
      },
    });

    res.status(200).json({
      success: generations.every((el) => el.status == Status.COMPLETED),
      images: generations.map((el) => el.imageUrl),
    });
  } catch (err) {
    res.status(500).send(err);
  }
});
