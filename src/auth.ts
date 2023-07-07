import axios from "axios";
import { API_URL, ApiWrappedData, request } from "./utils/api";

export const STORAGE_KEY_ACCESS_TOKEN = 'access-token';

export function getAccessToken() {
  return window.localStorage.getItem(STORAGE_KEY_ACCESS_TOKEN);
}

export function setAccessToken(accessToken: string) {
  return window.localStorage.setItem(STORAGE_KEY_ACCESS_TOKEN, accessToken);
}

type AuthCallbackResponseData = {
  time: string;
  data: {
    access_token: string;
  };
};

export async function getTokenFromCode(code: string) {
  const url = '/api/auth/oauth/callback';

  return request<AuthCallbackResponseData>({
    url,
    method: 'POST',
    data: { provider: 'google' },
    params: { code: (code) },
    headers: {
      "Accept": "application/json",
    },
  });
}

type AuthLinkResponse = {
  redirect_url: string;
};

export enum AuthProvider {
  GOOGLE = 'google',
}

export async function getAuthLink(provider: AuthProvider) {
  const url = `${API_URL}/api/auth/oauth`;

  return axios.request<ApiWrappedData<AuthLinkResponse>>({
    url,
    method: 'POST',
    data: { provider },
  });
}
