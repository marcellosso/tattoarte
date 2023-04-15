import axios from 'axios';

const generateImage = async () => {
  const data = await axios.get(`/api/generation/test`);
  console.log(data);
  return data;
};

export default generateImage;
