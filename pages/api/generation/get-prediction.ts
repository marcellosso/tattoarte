import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN || '',
});

module.exports = withApiAuthRequired(async (req, res) => {
  try {
    const { id } = req.body as { id: string };

    const prediction = await replicate.predictions.get(id);

    res.status(200).json(prediction);
  } catch (err) {
    res.status(500).send(err);
  }
});
