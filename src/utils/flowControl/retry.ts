import { Logger } from '../console/logger';
import { callFunctionWithTimeoutLimit } from './callFunctionWithTimeowutLimit';

export interface IRetryOptions {
  timeout?: number;
  retries?: number;
}

export async function retryOp<T>(
  op: () => Promise<T>,
  logger: Logger,
  options?: IRetryOptions,
): Promise<T> {
  const timeout = options?.timeout;
  const retries = options?.retries;
  const func = timeout ? () => callFunctionWithTimeoutLimit<T>(op, timeout) : op;
  let result: T;
  try {
    result = await func();
  } catch (err) {
    if (retries) {
      result = await retryOp(op, logger, { timeout, retries: retries - 1 });
    } else {
      throw new Error('Retried operation failed');
    }
  }
  return result;
}
