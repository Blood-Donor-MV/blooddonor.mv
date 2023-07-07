import { STORAGE_KEY_ACCESS_TOKEN, getAccessToken } from '@app/auth';
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
  isAxiosError,
} from 'axios';

type RawErrorData = {
  message: string;
};

export type RequestMiddleware = (
  config: InternalAxiosRequestConfig,
) => InternalAxiosRequestConfig;
export type ResponseMiddleware = (response: AxiosResponse) => AxiosResponse;

let responseMiddlewares: ResponseMiddleware[] = [];

export function addResponseMiddleware(middleware: ResponseMiddleware) {
  responseMiddlewares.push(middleware);
}

const client = axios.create({
  timeout: 1000,
});

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

client.interceptors.request.use(
  (config) => {
    config.baseURL = API_URL;
    const token = getAccessToken();
    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }

    return config;
  },
  (error) => {
    console.log(error); // for debug
    throw error;
  },
);

client.interceptors.response.use(
  (response) => {
    return responseMiddlewares.reduce(
      (previousResponse: AxiosResponse, middleware: ResponseMiddleware) =>
        middleware(previousResponse),
      response,
    );
  },
  (error) => {
    if (isAxiosError<RawErrorData>(error)) {
      if (error.response?.status === 400 && error.response?.data.message) {
        error.message = error.response?.data.message;
      }
      throw error;
    }
    throw error;
  },
);

export type ApiResponse<T> = AxiosResponse<T>;

export type ApiWrappedData<T> = {
  data: T;
};

export async function request<T>(
  options: AxiosRequestConfig,
  transform?: (data: T) => T,
): Promise<ApiResponse<T>> {
  const response = await client(options);

  if (transform) {
    response.data = transform(response.data);
  }

  return response as ApiResponse<T>;
}

export async function getApiResource<T>(
  options: AxiosRequestConfig,
  transform?: (data: T) => T,
) {
  return request<T>(options, transform);
}
