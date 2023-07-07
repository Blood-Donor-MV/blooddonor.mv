import { ApiWrappedData, request } from "@app/utils/api";

type Profile = {
  id: number;
  oauth_id: null;
  name: string;
  email: string;
  email_verified_at: null;
};

export async function getProfile() {
  const url = '/api/user';

  return request<Profile>({
    url,
  });
}
