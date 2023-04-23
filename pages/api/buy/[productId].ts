import { prisma } from '@/utils/use-prisma';
import { withApiAuthRequired, getSession, Session } from '@auth0/nextjs-auth0';
import { User } from '@prisma/client';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});

module.exports = withApiAuthRequired(async (req, res) => {
  try {
    const { productId } = req.query;

    const {
      user: { email },
    } = (await getSession(req, res)) as Session;

    const user = (await prisma.user.findUnique({
      where: {
        email,
      },
    })) as User;

    const session = await stripe.checkout.sessions.create({
      customer_email: user.email!,
      line_items: [
        {
          price: productId as string,
          quantity: 1,
        },
      ],
      mode: 'payment',
      payment_intent_data: {
        metadata: {
          userId: user?.id,
          productId: productId as string,
        },
      },
      success_url: `${process.env.AUTH0_BASE_URL}/criar`,
      cancel_url: `${process.env.AUTH0_BASE_URL}/precos`,
    });

    res.json({ id: session.id });
  } catch (err) {
    res.send(err);
  }
});
