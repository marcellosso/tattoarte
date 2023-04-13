import axios from 'axios';
import getStripe from './get-stripe';

const processPayment = async (productId: string) => {
  const stripe = await getStripe();
  const { data } = await axios.get(`/api/charge-card/${productId}`);
  await stripe!.redirectToCheckout({ sessionId: data.id });
};

export default processPayment;
