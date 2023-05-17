const poll = <T>(
  fn: () => Promise<T>,
  validate: (data: T) => boolean,
  interval: number,
  maxAttempts: number
) => {
  let attempts = 0;

  const executePoll = async (resolve: any, reject: any) => {
    const result = await fn();
    attempts++;

    if (validate(result)) {
      return resolve(result);
    } else if (maxAttempts && attempts >= maxAttempts) {
      return reject(
        new Error(
          'Você atingiu o limite máximo de tentativas, por favor tente novamente.'
        )
      );
    } else {
      setTimeout(executePoll, interval, resolve, reject);
    }
  };

  return new Promise(executePoll);
};

export default poll;
