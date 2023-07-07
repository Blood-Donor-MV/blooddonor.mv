import { request } from "./utils/api";

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
