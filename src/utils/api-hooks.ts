import useSwr, { SWRResponse } from 'swr';
import { ApiResponse as ApiResponseBase, ApiWrappedData } from './api';

type FAs<A extends unknown[], R> = [(...args: A) => R, ...A];

type ApiResponse<T> = ApiResponseBase<T>;

type Key<Args extends unknown[], Data> = FAs<Args, Promise<ApiResponse<Data>>>;

export async function defaultFetcher<A extends unknown[], R>([fn, ...args]: FAs<
  A,
  Promise<ApiResponse<R>>
>): Promise<R> {
  return (await fn.apply(null, args)).data;
}

type HookResult<Data = any, Error = any> = SWRResponse<Data, Error> & {
  isRefreshing: boolean;
};

export const useApi = <
  Args extends unknown[],
  Data = any,
  ResponseError extends Error = Error,
>(
  key: Key<Args, Data> | undefined | null,
): HookResult<Data, ResponseError> => {
  const { data, error, mutate, isValidating, isLoading } = useSwr<
    Data,
    ResponseError
  >(key, defaultFetcher);

  return {
    data,
    error,
    mutate,
    isLoading,
    isRefreshing: isValidating && !!data && !error,
    isValidating,
  };
};

export function getApiError(...args: HookResult[]): Error | undefined {
  for (const result of args) {
    if (result.error) {
      return result.error;
    }
  }
}

export function isApiRefreshing(...args: HookResult[]): boolean {
  for (const result of args) {
    if (result.isRefreshing) {
      return true;
    }
  }

  return false;
}

export function isApiLoading(...args: HookResult[]): boolean {
  for (const result of args) {
    if (result.isLoading) {
      return true;
    }
  }

  return false;
}

export function getApiRetryFn(...args: HookResult[]): () => void {
  return () => {
    for (const result of args) {
      if (result.error) {
        result.mutate();
      }
    }
  };
}

export function getApiRefreshFn(...args: HookResult[]): () => void {
  return () => {
    for (const result of args) {
      result.mutate();
    }
  };
}
