'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import WeekSelector from '@/components/WeekSelector/WeekSelector';
import JourneyDetails from '@/components/JourneyDetails/JourneyDetails';
import styles from './page.module.css';
import { PuffLoader } from 'react-spinners';
import { useWeek } from '@/lib/hooks/useWeek';
import { useAuthStore } from '@/lib/store/authStore';
import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';

export default function JourneyPage() {
  const params = useParams();
  const router = useRouter();
  const dueDate = useAuthStore(state => state.user.dueDate);

  const maxWeek = useWeek(dueDate);
  const selectedWeek = parseInt(params.weekNumber as string) || 1;

  useEffect(() => {
    if (maxWeek !== null && selectedWeek > maxWeek) {
      router.replace(`/journey/${maxWeek}`);
    }
  }, [maxWeek, selectedWeek, router]);

  if (maxWeek === null || selectedWeek > maxWeek) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <PuffLoader />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.journeyPage}>
        <div className={styles.journeyPage__content}>
          <GreetingBlock />
          <WeekSelector selectedWeek={selectedWeek} maxWeek={maxWeek} />
          <JourneyDetails weekNumber={selectedWeek} />
        </div>
      </div>
    </div>
  );
}
