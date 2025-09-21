'use client';

import WeekButton from "../WeekButton/WeekButton";
import styles from './WeekSelector.module.css';
import { useRef, useEffect } from 'react';

const WeekSelector: React.FC = () => {
  const currentUserWeek = 16;
  const allWeeks = Array.from({ length: 40 }, (_, i) => i + 1);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToCurrentWeek = () => {
    if (containerRef.current) {
      const weekElement = containerRef.current.children[currentUserWeek - 1] as HTMLElement;
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
  }, []);

  return (
    <div ref={containerRef} className={styles.weekSelector}>
      {allWeeks.map((week) => (
        <WeekButton 
          key={week} 
          weekNumber={week}
          isCurrent={week === currentUserWeek}
          isDisabled={week > currentUserWeek}
        />
      ))}
    </div>
  );
};

export default WeekSelector;