import { NextApiRequest, NextApiResponse } from 'next';
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN || '',
});

module.exports = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.body as { id: string };

    const prediction = await replicate.predictions.get(id);

    res.status(200).json(prediction);
  } catch (err) {
    res.status(500).send(err);
  }
};
