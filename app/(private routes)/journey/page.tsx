'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PuffLoader } from 'react-spinners';
import { useAuthStore } from '@/lib/store/authStore';
import { useWeek } from '@/lib/hooks/useWeek';

export default function JourneyRedirectPage() {
  const router = useRouter();
  const dueDate = useAuthStore(state => state.user.dueDate);
  const currentWeek = useWeek(dueDate);

  useEffect(() => {
    if (currentWeek) {
      router.replace(`/journey/${currentWeek}`);
    }
  }, [router, currentWeek]);

  if (!currentWeek) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <PuffLoader />
      </div>
    );
  }

  return null;
}
