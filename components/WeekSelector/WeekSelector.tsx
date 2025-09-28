'use client';

import WeekButton from '../WeekButton/WeekButton';
import styles from './WeekSelector.module.css';
import { useRef, useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import PuffLoader from 'react-spinners/PuffLoader';

interface WeekSelectorProps {
  selectedWeek: number;
  maxWeek: number;
}

const WeekSelector: React.FC<WeekSelectorProps> = ({
  selectedWeek,
  maxWeek,
}) => {
  const router = useRouter();
  const allWeeks = Array.from({ length: 42 }, (_, i) => i + 1);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPending, startTransition] = useTransition();

  const handleWeekClick = (weekNumber: number) => {
    if (weekNumber <= maxWeek && weekNumber !== selectedWeek) {
      startTransition(() => {
        router.push(`/journey/${weekNumber}`);
      });
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      const weekElement = containerRef.current.children[
        selectedWeek - 1
      ] as HTMLElement;
      if (weekElement) {
        const container = containerRef.current;
        const weekLeft = weekElement.offsetLeft;
        const weekWidth = weekElement.offsetWidth;
        const containerWidth = container.offsetWidth;

        container.scrollTo({
          left: weekLeft - containerWidth / 2 + weekWidth / 2,
          behavior: 'smooth',
        });
      }
    }
  }, [selectedWeek]);

  return (
    <div className={styles.weekSelectorContainer}>
      <div ref={containerRef} className={styles.weekSelector}>
        {allWeeks.map(week => (
          <WeekButton
            key={week}
            weekNumber={week}
            isCurrent={week === selectedWeek}
            isDisabled={week > maxWeek || isPending}
            onClick={() => handleWeekClick(week)}
          />
        ))}
      </div>

      {isPending && (
        <div className={styles.loaderContainer}>
          <PuffLoader />
        </div>
      )}
    </div>
  );
};

export default WeekSelector;
