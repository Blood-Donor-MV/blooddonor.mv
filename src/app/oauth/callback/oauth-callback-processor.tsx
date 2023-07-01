'use client';

import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const url = 'http://localhost/api/auth/oauth/callback';

type UserResponseData = {
  id: number;
  oauth_id: string | null;
  name: string;
  email: string;
  email_verified_at: null | string;
  created_at: string;
  updated_at: string;
};

type AuthCallbackResponseData = {
  time: string;
  data: {
    access_token: string;
  };
};

const STORAGE_KEY_ACCESS_TOKEN = 'access-token';

export default function OAuthCallbackProcessor() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState('init');

  useEffect(() => {
    const postAuth = async () => {
      if (status !== 'init') {
        return;
      }

      const code = searchParams.get('code');
      if (!code) {
        console.log('no code', code);
        return;
      }

      setStatus('loading');

      try {
        const res = await axios.request<AuthCallbackResponseData>({
          url,
          method: 'POST',
          data: { provider: 'google' },
          params: { code: (code) },
          headers: {
            "Accept": "application/json",
          },
        });

        console.log('status', res.status);
        console.log('data', res.data);

        window.localStorage.setItem(STORAGE_KEY_ACCESS_TOKEN, res.data.data.access_token);
        setStatus(`${res.status}`);
        router.replace('/');
      } catch(e) {
        setStatus('Error');
      }
    };

    postAuth();
  }, [searchParams, status, setStatus]);

  return (
    <div>
      <div>State: {status}</div>
      <div>Code: {searchParams.get('code')}</div>
    </div>
  );
}
