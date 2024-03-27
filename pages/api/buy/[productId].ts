import { prisma } from '@/utils/use-prisma';
import { User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { clerkClient, getAuth } from '@clerk/nextjs/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2022-11-15',
});

module.exports = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { productId } = req.query;

    const { userId } = await getAuth(req);
    const { externalId } = await clerkClient.users.getUser(userId ?? '');

    const user = (await prisma.user.findUnique({
      where: {
        id: externalId ?? '',
      },
    })) as User;

    const session = await stripe.checkout.sessions.create({
      customer_email: user.email ?? '',
      line_items: [
        {
          price: productId as string,
          quantity: 1,
        },
      ],
      mode: 'payment',
      payment_intent_data: {
        metadata: {
          userId: externalId ?? '',
          productId: productId as string,
        },
      },
      discounts: [
        {
          coupon: user.freeTrial
            ? process.env.STRIPE_DISCOUNT_COUPON_ID
            : undefined,
        },
      ],

      success_url: `${process.env.AUTH0_BASE_URL}/criar`,
      cancel_url: `${process.env.AUTH0_BASE_URL}/precos`,
    });

    res.json({ id: session.id });
  } catch (err) {
    res.send(err);
  }
};
