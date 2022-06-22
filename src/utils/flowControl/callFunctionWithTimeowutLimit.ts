export const callFunctionWithTimeoutLimit = async <T>(f: () => Promise<T>, timeout: number) => {
  const timeoutFunc = () =>
    new Promise((res, rej) =>
      setTimeout(() => rej(`The function ${f.name} ran too long!`), timeout),
    );

  return Promise.race([f, timeoutFunc].map((f) => f())) as Promise<T>;
};
