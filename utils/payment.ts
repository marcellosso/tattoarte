import axios from 'axios';
import getStripe from './get-stripe';

const processPayment = async (productId: string) => {
  const stripe = await getStripe();
  if (!stripe) return;

  const { data } = await axios.get(`/api/buy/${productId}`);
  await stripe.redirectToCheckout({ sessionId: data.id });
};

export default processPayment;
