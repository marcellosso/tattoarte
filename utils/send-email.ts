import { FormData } from '@/pages/contato';
import axios from 'axios';

const sendEmail = async (data: FormData) => {
  const apiEndpoint = '/api/email';

  await axios.post('/api/email', data);

  // fetch(apiEndpoint, {
  //   method: 'POST',
  //   body: JSON.stringify(data),
  // })
  //   .then((res) => res.json())
  //   .then((response) => {
  //     alert(response.message);
  //   })
  //   .catch((err) => {
  //     alert(err);
  //   });
};

export { sendEmail };
