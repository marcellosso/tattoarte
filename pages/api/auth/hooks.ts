import prisma from '@/utils/use-prisma';
import Stripe from 'stripe';

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
    }
  } else {
    res.send('You forgot to send me your secret!');
  }
};
