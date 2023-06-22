import { ParamsType } from '@/types';
import { User } from '@prisma/client';
import axios from 'axios';
import poll from './poll';

const generateImage = async (params: ParamsType, userInfo: User) => {
  try {
    const res = await axios.post('/api/generation/create-stability-request', {
      params: params,
      user: userInfo,
    });

    const { newUserData, generationIds } = res.data;

    const getGenerations = async () => {
      const { data } = await axios.post('/api/generation/get-generations', {
        generationIds: generationIds,
      });

      return { ...data };
    };

    // Force await 5 seconds as most generations will take 5 to 10 seconds
    // With this we can avoid sending too many api calls to the server
    await new Promise((r) => setTimeout(r, 10_000));

    const generations = (await poll(
      getGenerations,
      (res) => res?.success,
      1_500,
      30
    )) as { success: boolean; images: string[] };

    const newUserInfo = await axios.post(
      '/api/generation/create-callback-stability',
      {
        user: newUserData,
      }
    );

    return {
      newUserData: newUserInfo.data.newUserData,
      images: generations.images,
    };
  } catch (err: any) {
    throw err.response?.data || err.message || err;
  }
};

export default generateImage;
