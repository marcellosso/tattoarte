import { ParamsType } from '@/types';
import { User } from '@prisma/client';
import axios from 'axios';

const generateImage = async (params: ParamsType, userInfo: User) => {
  try {
    const { data } = await axios.post('/api/generation/create', {
      params: params,
      user: userInfo,
    });
    return data;
  } catch (err: any) {
    throw err.response?.data || err.message;
  }
};

export default generateImage;
