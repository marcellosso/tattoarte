import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});

export default async (req: any, res: any) => {
  try {
    const { customerId } = req.query;

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.AUTH0_BASE_URL}/criar`,
    });

    res.send({
      url: session.url,
    });
  } catch (err: any) {
    res.status(400).send(err.message);
  }
};
