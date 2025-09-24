'use client';

import WeekButton from "../WeekButton/WeekButton";
import styles from './WeekSelector.module.css';
import { useRef, useEffect } from 'react';
import { useRouter } from "next/navigation";


interface WeekSelectorProps {
  currentWeek: number;
}

const WeekSelector: React.FC<WeekSelectorProps> = ({currentWeek}) => {
  const router = useRouter();
  const allWeeks = Array.from({ length: 40 }, (_, i) => i + 1);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleWeekClick = (weekNumber: number) => {
    if (weekNumber <= currentWeek) {
      router.push(`/journey/${weekNumber}`);
    }
  }


  const scrollToCurrentWeek = () => {
    if (containerRef.current) {
      const weekElement = containerRef.current.children[currentWeek - 1] as HTMLElement;
      if (weekElement) {
        const container = containerRef.current;
        const weekLeft = weekElement.offsetLeft;
        const weekWidth = weekElement.offsetWidth;
        const containerWidth = container.offsetWidth;
        
        container.scrollTo({
          left: weekLeft - (containerWidth / 2) + (weekWidth / 2),
          behavior: 'smooth'
        });
      }
    }
  };

  useEffect(() => {
    scrollToCurrentWeek();
  }, [currentWeek]);

  return (
    <div ref={containerRef} className={styles.weekSelector}>
      {allWeeks.map((week) => (
        <WeekButton 
        key={week} 
        weekNumber={week}
        isCurrent={week === currentWeek}
        isDisabled={week > currentWeek}
        onClick={() => handleWeekClick(week)}
      />

      ))}
    </div>
  );
};

export default WeekSelector;