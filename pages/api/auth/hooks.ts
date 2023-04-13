import { PrismaClient } from '@prisma/client';
import Stripe from 'stripe';

const prisma = new PrismaClient();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});

module.exports = async (req: any, res: any) => {
  const { email, secret } = JSON.parse(req.body);

  if (secret === process.env.AUTH0_HOOK_SECRET) {
    try {
      const customer = await stripe.customers.create({
        email,
      });
      await prisma.user.create({
        data: { email, stripeId: customer.id },
      });
    } catch (err) {
      console.log(err);
    } finally {
      await prisma.$disconnect();
      res.send({ received: true });
    }
  } else {
    res.send('You forgot to send me your secret!');
  }
};
