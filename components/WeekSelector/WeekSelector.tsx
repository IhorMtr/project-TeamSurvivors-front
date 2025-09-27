'use client';

import WeekButton from "../WeekButton/WeekButton";
import styles from './WeekSelector.module.css';
import { useRef, useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import PuffLoader from "react-spinners/PuffLoader";

interface WeekSelectorProps {
  currentWeek: number;
}

const WeekSelector: React.FC<WeekSelectorProps> = ({ currentWeek }) => {
  const router = useRouter();
  const allWeeks = Array.from({ length: 40 }, (_, i) => i + 1);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(currentWeek);

  const handleWeekClick = async (weekNumber: number) => {
    if (weekNumber <= currentWeek && weekNumber !== selectedWeek) {
      setIsLoading(true);
      setSelectedWeek(weekNumber);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      
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

  useEffect(() => {
    if (selectedWeek === currentWeek) {
      setIsLoading(false);
    }
  }, [currentWeek, selectedWeek]);

  return (
    <div className={styles.weekSelectorContainer}>
      <div ref={containerRef} className={styles.weekSelector}>
        {allWeeks.map((week) => (
          <WeekButton 
            key={week} 
            weekNumber={week}
            isCurrent={week === currentWeek}
            isDisabled={week > currentWeek || isLoading}
            onClick={() => handleWeekClick(week)}
          />
        ))}
      </div>
      
      Лоадер под неделями
      {isLoading && (
        <div className={styles.loaderContainer}>
          <PuffLoader size={40} color="#36d7b7" />
          <span>Завантаження даних...</span>
        </div>
      )}
    </div>
  );
};

export default WeekSelector;