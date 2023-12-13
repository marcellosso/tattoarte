import { prisma } from '@/utils/use-prisma';
import { clerkClient } from '@clerk/nextjs';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2022-11-15',
});

module.exports = async (req: any, res: any) => {
  const { data } = req.body;

  const { id, first_name, last_name, username, email_addresses } = data;
  const email = email_addresses[0].email_address;
  let name = username ?? first_name;
  if (!username && last_name) {
    name += ` ${last_name}`;
  }

  const { secret } = req.headers;

  if (secret === process.env.AUTH0_HOOK_SECRET) {
    try {
      const customer = await stripe.customers.create({
        email,
      });

      const userId = id.split('_')[1];

      await clerkClient.users.updateUser(id, { externalId: userId });
      await clerkClient.users.updateUserMetadata(id, {
        privateMetadata: { stripeId: customer.id },
      });

      const user = await prisma.user.create({
        data: { id: userId, email, name, stripeId: customer.id },
      });

      res.status(200).json(user.id);
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    res.status(400).send('You forgot to send me your secret!');
  }
};
