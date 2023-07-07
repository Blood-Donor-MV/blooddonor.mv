import { API_URL } from '@app/utils/api';
import axios from 'axios';
import Link from 'next/link';

export default async function Login() {
  const auth_link = await axios.post(`${API_URL}/api/auth/oauth`, { provider: 'google' });
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Login page</h1>
      <Link href={auth_link.data.data.redirect_url}>Google</Link>
    </main>
  )
}
