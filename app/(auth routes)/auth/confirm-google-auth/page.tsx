'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '../../../../lib/store/authStore';
import { confirmGoogleOAuth } from '@/lib/api/auth';

export default function ConfirmGoogleAuth() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setUser = useAuthStore(state => state.setUser);

  useEffect(() => {
    const code = searchParams.get('code');
    if (!code) {
      router.push('/auth/login');
      return;
    }

    const loginWithGoogle = async () => {
      try {
        await confirmGoogleOAuth(code);
        router.push('/profile/edit');
      } catch {
        router.push('/auth/login');
      }
    };

    loginWithGoogle();
  }, [searchParams, setUser, router]);

  return <p>Зачекайте, підтверджуємо вхід...</p>;
}
