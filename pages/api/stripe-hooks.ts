import { PriceTabEnum } from '@/types';
import { prisma } from '@/utils/use-prisma';
import { User } from '@prisma/client';
import { buffer } from 'micro';
import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2022-11-15',
});

export const config = { api: { bodyParser: false } };

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const reqBuffer = await buffer(req);
  const signature = req.headers['stripe-signature'] as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      reqBuffer,
      signature,
      process.env.STRIPE_SIGNING_SECRET ?? ''
    );

    const { metadata } = event.data.object as Record<string, any>;

    switch (event.type) {
      case 'charge.succeeded':
        if (metadata?.userId) {
          const user = (await prisma.user.findUnique({
            where: {
              id: metadata.userId,
            },
          })) as User;

          const newUserData = {} as Record<string, any>;

          const products = await stripe.products.list();
          const product = products.data.find(
            (product: Record<string, any>) =>
              product.default_price == metadata?.productId
          );

          if (product?.metadata?.productType == PriceTabEnum.PACKAGE) {
            newUserData.credits =
              (user.credits ?? 0) + parseInt(product?.metadata?.productAmount);
          } else if (product?.metadata?.productType == PriceTabEnum.ACCESS) {
            newUserData.subscribed = true;
            newUserData.subscriptionDuration = parseInt(
              product?.metadata?.productAmount
            );
            newUserData.subscriptionAt = new Date();
          }

          await prisma.user.update({
            where: {
              id: metadata.userId,
            },
            data: {
              ...newUserData,
              freeTrial: false,
            },
          });
        }
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (err: any) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  res.send({ received: true });
};
