import axios from 'axios';

const toggleLike = async (generationId: string) => {
  try {
    await axios.put('/api/generation/like', {
      id: generationId,
    });

    return true;
  } catch (err: any) {
    let normalizedError =
      err.response?.data?.description ||
      err.response?.data ||
      err.message ||
      err;
    if (err.response?.data?.error == 'not_authenticated')
      normalizedError = 'Você precisa estar logado para curtir essa tatuagem!';
    throw normalizedError;
  }
};

export default toggleLike;
