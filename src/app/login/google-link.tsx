'use client';

import axios from 'axios';
import Link from 'next/link'
import useSwr from 'swr';

const apiUrl = 'http://localhost';
export default async function GoogleLink() {
  const { data } = useSwr(`${apiUrl}/api/auth/oauth`, async (key) => {
    return axios.request({
      url: key,
      method: 'POST',
      data: { provider: 'google' },
    });
  }, { revalidateIfStale: false, shouldRetryOnError: false });

  if (data) {
    return (
      <Link href={data.data.data.redirect_url}>Google</Link>
    );
  } else {
    return <span>Loading..</span>;
  }
}
