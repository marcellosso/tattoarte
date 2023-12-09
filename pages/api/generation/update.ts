import { prisma } from '@/utils/use-prisma';
import { Generation } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

module.exports = async (req: NextApiRequest, res: NextApiResponse) => {
  const { updateGenerations } = req.body;

  try {
    await Promise.all(
      updateGenerations.map(async (favorite: Generation) => {
        await prisma.generation.update({
          where: {
            id: favorite.id,
          },
          data: {
            is_favorite: favorite.is_favorite,
          },
        });
      })
    );

    res.status(200).send('Generations updated');
  } catch (err) {
    res.status(500).send(err);
  }
};
