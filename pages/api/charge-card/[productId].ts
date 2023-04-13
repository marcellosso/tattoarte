// pages/api/charge-card/[courseId].js

import { withApiAuthRequired, getSession, Session } from '@auth0/nextjs-auth0';
import { PrismaClient, User } from '@prisma/client';
import Stripe from 'stripe';

const prisma = new PrismaClient();
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
    console.log(req.headers.referer);

    const session = await stripe.checkout.sessions.create({
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
      success_url: `${req.headers.referer}/app`,
      cancel_url: `${req.headers.referer}/`,
    });

    res.json({ id: session.id });
  } catch (err) {
    res.send(err);
  } finally {
    await prisma.$disconnect();
  }
});
