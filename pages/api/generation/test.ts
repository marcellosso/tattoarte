import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports = withApiAuthRequired(async (req, res) => {
  try {
    const response = await openai.createImage({
      prompt: 'a white siamese cat',
      n: 1,
      size: '1024x1024',
    });
    const image_url = response.data.data[0].url;
    res.json({ id: image_url });
  } catch (err) {
    res.send(err);
  }
});
