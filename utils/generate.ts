import { ParamsType } from '@/types';
import { User } from '@prisma/client';
import axios from 'axios';
import type { Prediction } from 'replicate';
import poll from './poll';

const getLogsPercentage = (logs: string) => {
  const lastLine =
    logs
      .split('\n')
      .filter((line) => line.trim() !== '')
      .pop() || '';
  const percentageMatch = lastLine.match(/\s+(\d+)%/);
  if (percentageMatch && percentageMatch.length > 0)
    return parseInt(percentageMatch[1]);

  return 0;
};

type PredictionDraft = Partial<Prediction>;

const validatePrediction = (predictionData: PredictionDraft) => {
  return predictionData.status == 'succeeded';
};

const generateImage = async (
  params: ParamsType,
  userInfo: User,
  setProgress: (progress: number) => void
) => {
  try {
    const { data } = await axios.post('/api/generation/create-prediction', {
      params: params,
      user: userInfo,
    });

    const getPredictionData = async () => {
      const res = await axios.post('/api/generation/get-prediction', {
        id: data?.predictionId,
      });
      const prediction = res.data as PredictionDraft;

      setProgress(getLogsPercentage(prediction.logs || ''));

      return {
        status: prediction.status,
        output: prediction.output,
        metrics: prediction.metrics,
      };
    };

    const callCreateCallback = async (): Promise<{ success: boolean }> => {
      const res = await axios.post('/api/generation/create-callback', {
        params,
        user: data.newUserData,
        images: prediction.output,
      });

      return res?.data;
    };

    // // Force await 10 seconds as most generations will take 11 to 15 seconds
    // // With this we can avoid sending too many api calls to the server
    // await new Promise((r) => setTimeout(r, 11_000));

    const prediction = (await poll(
      getPredictionData,
      validatePrediction,
      1_500,
      100
    )) as Prediction;

    poll(callCreateCallback, (res) => res?.success, 1_000, 5);

    return { newUserData: data.newUserData, images: prediction.output };
  } catch (err: any) {
    throw err.response?.data || err.message || err;
  }
};

export default generateImage;
