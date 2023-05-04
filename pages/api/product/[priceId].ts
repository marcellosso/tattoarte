import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2022-11-15',
});

module.exports = withApiAuthRequired(async (req, res) => {
  try {
    const { priceId } = req.query;
    const price = await stripe.prices.retrieve(priceId as string);

    const product = await stripe.products.retrieve(price.product as string);

    res.json({
      price: price.unit_amount,
      title: product.name,
      description: product.description,
      image: product.images[0],
    });
  } catch (err) {
    res.send(err);
  }
});
