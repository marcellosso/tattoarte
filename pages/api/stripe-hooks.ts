import { PrismaClient, User } from '@prisma/client';
import { Console } from 'console';
import { buffer } from 'micro';
import Stripe from 'stripe';

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});

export const config = { api: { bodyParser: false } };

export default async (req: any, res: any) => {
  const reqBuffer = await buffer(req);
  const signature = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      reqBuffer,
      signature,
      process.env.STRIPE_SIGNING_SECRET!
    );

    const { metadata } = event.data.object as any;

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
            (product: any) => product.default_price == metadata?.productId
          );

          if (product?.metadata?.productType == 'package') {
            newUserData.availableGenerations =
              user.availableGenerations! +
              parseInt(product?.metadata?.productAmount);
          } else if (product?.metadata?.productType == 'access') {
            newUserData.passSubscription = true;
            newUserData.passDuration = parseInt(
              product?.metadata?.productAmount
            );
            newUserData.passSubscriptionAt = new Date();
          }

          await prisma.user.update({
            where: {
              id: metadata.userId,
            },
            data: newUserData,
          });
        }
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (err: any) {
    console.log(err);

    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // check what kind of event stripe has sent us

  res.send({ received: true });
};
