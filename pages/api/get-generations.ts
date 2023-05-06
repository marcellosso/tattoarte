import { prisma } from '@/utils/use-prisma';
import { NextApiRequest, NextApiResponse } from 'next';

module.exports = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { generationCursor, generationStyle } = req.query;
    const generations =
      (await prisma.generation.findMany({
        where: {
          is_private: false,
          style: (generationStyle || undefined) as string,
        },
        take: 24,
        skip: 1,
        cursor: {
          id: generationCursor as string,
        },
        orderBy: [
          {
            createdAt: 'desc',
          },
        ],
      })) || [];

    res.json({ generations });
  } catch (err) {
    res.send(err);
  }
};
