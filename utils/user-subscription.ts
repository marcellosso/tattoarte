import { User } from '@prisma/client';
import prisma from './use-prisma';

const handleUserSubscription = async (user: User) => {
  const date1 = new Date();
  const date2 = new Date(user.subscriptionAt as Date);

  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const diffMaxDurationDays = user.subscriptionDuration as number;
  if (diffDays >= diffMaxDurationDays) {
    user.subscriptionDuration = 0;
    user.subscriptionAt = null;
    user.subscribed = false;

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: { ...user },
    });
  }
  return user;
};

export default handleUserSubscription;
