import { prisma } from '@/utils/use-prisma';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import type { User } from '@prisma/client';

module.exports = withApiAuthRequired(async (req, res) => {
  try {
    const { user } = req.body as {
      user: User;
    };

    const updateAchievements = {} as Record<string, boolean>;

    if (user.generationCount == 1) {
      updateAchievements['hasBronzeCoin'] = true;
    } else if (user.generationCount == 5) {
      updateAchievements['hasSilverCoin'] = true;
    } else if (user.generationCount == 10) {
      updateAchievements['hasGoldCoin'] = true;
    } else if (user.generationCount == 50) {
      updateAchievements['hasPlatinumCoin'] = true;
    } else if (user.generationCount == 100) {
      updateAchievements['hasDiamondCoin'] = true;
    }

    const newUserData = await prisma.user.update({
      where: {
        email: user.email ?? '',
      },
      data: {
        credits: user.credits,
        generationCount: user.generationCount,
        ...updateAchievements,
      },
    });

    res.status(200).json({ newUserData });
  } catch (err) {
    res.status(500).send('Error updating user information');
  }
});
