'use client';

import { getProfile } from '@app/api/profile';
import LoadingContainer from '@app/components/loading-container';
import { useApi } from '@app/utils/api-hooks';
import Image from 'next/image'

export default function ProfilePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Profile</h1>
      <Profile />
    </main>
  )
}

function Profile() {
  const { data: profile, error, mutate } = useApi([getProfile]);

  return (
    <LoadingContainer error={error} retry={mutate}>
      {profile && (
        <dl>
          <dt>Name</dt>
          <dd>{profile.name}</dd>
        </dl>
      )}
    </LoadingContainer>
  );
}
