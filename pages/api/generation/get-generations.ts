import { prisma } from '@/utils/use-prisma';
import { Status } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

module.exports = async (req: NextApiRequest, res: NextApiResponse) => {
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
};
