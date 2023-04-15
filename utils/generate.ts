import axios from 'axios';

const generateImage = async (params: ParamsType) => {
  try {
    const { data } = await axios.post('/api/generation/create', params);
    return data;
  } catch (err: any) {
    throw err.response?.data || err.message;
  }
};

export default generateImage;
