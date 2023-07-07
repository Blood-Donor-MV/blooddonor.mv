'use client';

import { getTokenFromCode, setAccessToken } from '@app/auth';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

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
        const res = await getTokenFromCode(code);

        setAccessToken(res.data.data.access_token);
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
