'use client';

import { useAuthStore } from '@/lib/store/authStore';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function OnboardingGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) return;

    const isOnboardingDone = Boolean(user.gender || user.dueDate || user.photo);

    if (isOnboardingDone && pathname === '/profile/edit') {
      router.replace('/');
    }
  }, [isAuthenticated, user, pathname, router]);

  return <>{children}</>;
}
