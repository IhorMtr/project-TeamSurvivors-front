'use client';

import { useAuthStore } from '@/lib/store/authStore';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';

export default function OnboardingGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  const toastShown = useRef(false);

  useEffect(() => {
    if (!isAuthenticated) return;

    const isOnboardingDone = Boolean(user.gender && user.dueDate);

    if (!isOnboardingDone && pathname !== '/profile/edit') {
      if (!toastShown.current) {
        toast.error('Ви не пройшли онбордінг!');
        toastShown.current = true;
      }
      router.replace('/profile/edit');
    }

    if (isOnboardingDone && pathname === '/profile/edit') {
      router.replace('/');
    }
  }, [isAuthenticated, user, pathname, router]);

  return <>{children}</>;
}
