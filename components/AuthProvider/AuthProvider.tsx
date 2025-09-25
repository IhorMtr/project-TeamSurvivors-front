'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { api, refreshSession, logoutUser } from '@/lib/api/auth';
import { useRouter } from 'next/navigation';
import type { User } from '@/types/user';
import type { ApiResponse } from '@/lib/api/auth';

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

  useEffect(() => {
    let cancelled = false;

    async function checkUser() {
      try {
        const { accessToken } = await refreshSession();
        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        const user = await getCurrentUser();
        if (user && !cancelled) {
          setUser(user);
        } else if (!cancelled) {
          clearIsAuthenticated();
          logoutUser().catch(() => {});
          router.replace('/auth/login');
        }
      } catch {
        if (!cancelled) {
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

    checkUser();

    return () => {
      cancelled = true;
    };
  }, [setUser, clearIsAuthenticated, router]);

  if (!ready) {
    return null;
  }

  return <>{children}</>;
}
