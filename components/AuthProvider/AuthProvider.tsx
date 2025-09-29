'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { api, refreshSession, logoutUser } from '@/lib/api/auth';
import { useRouter, usePathname } from 'next/navigation';
import type { User } from '@/types/user';
import type { ApiResponse } from '@/lib/api/auth';
import { PuffLoader } from 'react-spinners';

async function getCurrentUser(): Promise<User | null> {
  try {
    const res = await api.get<ApiResponse<User>>('/users/me');
    return res.data.data;
  } catch {
    return null;
  }
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUser = useAuthStore(state => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    state => state.clearIsAuthenticated
  );
  const [ready, setReady] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;

    if (
      pathname.startsWith('/auth/login') ||
      pathname.startsWith('/auth/register')
    ) {
      setReady(true);
      return;
    }

    async function checkUser(required: boolean) {
      try {
        const { accessToken } = await refreshSession();
        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        const user = await getCurrentUser();
        if (user && !cancelled) {
          setUser(user);
        } else if (required && !cancelled) {
          clearIsAuthenticated();
          logoutUser().catch(() => {});
          router.replace('/auth/login');
        }
      } catch {
        if (required && !cancelled) {
          clearIsAuthenticated();
          logoutUser().catch(() => {});
          router.replace('/auth/login');
        }
      } finally {
        if (!cancelled) {
          setReady(true);
        }
      }
    }

    if (pathname === '/') {
      checkUser(false);
      return;
    }

    checkUser(true);

    return () => {
      cancelled = true;
    };
  }, [pathname, setUser, clearIsAuthenticated, router]);

  if (!ready) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <PuffLoader />
      </div>
    );
  }

  return <>{children}</>;
}
