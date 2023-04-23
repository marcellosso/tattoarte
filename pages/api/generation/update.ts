import { prisma } from '@/utils/use-prisma';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { Generation } from '@prisma/client';

module.exports = withApiAuthRequired(async (req, res) => {
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
});
