import { prisma } from '@/utils/use-prisma';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2022-11-15',
});

module.exports = async (req: any, res: any) => {
  const { name, email, secret } = req.body;
  if (secret === process.env.AUTH0_HOOK_SECRET) {
    try {
      const customer = await stripe.customers.create({
        email,
      });

      const user = await prisma.user.create({
        data: { email, name, stripeId: customer.id, credits: 1 },
      });

      res.status(200).json(user.id);
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    res.status(400).send('You forgot to send me your secret!');
  }
};
