import axios from 'axios';
import Link from 'next/link'
import OAuthCallbackProcessor from './oauth-callback-processor';

export default async function OAuthCallback() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Authenticating</h1>
      <OAuthCallbackProcessor />
    </main>
  )
}
