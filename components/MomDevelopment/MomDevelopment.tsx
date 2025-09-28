'use client';

import { useEffect } from 'react';
import { useWeekData } from '@/lib/hooks/useWeekData';
import styles from './MomDevelopment.module.css';
import { PuffLoader } from 'react-spinners';
import TasksReminderCardJourney from '../TasksReminderCardJourney/TasksReminderCardJourney';
import { toast } from 'react-hot-toast';

interface MomDevelopmentProps {
  weekNumber: number;
}

const getIconByCategory = (category: string) => {
  switch (category) {
    case 'Харчування':
      return 'icon-fork_spoon';
    case 'Гігієна':
    case 'Активність':
      return 'icon-fitness_center';
    case 'Самопочуття':
    case 'Відпочинок та комфорт':
      return 'icon-chair';
    default:
      return 'icon-fork_spoon';
  }
};

export default function MomDevelopment({ weekNumber }: MomDevelopmentProps) {
  const { momData, isLoading, error } = useWeekData(weekNumber);

  useEffect(() => {
    if (error) {
      toast.error('Помилка завантаження даних');
    }
    if (!isLoading && !momData && !error) {
      toast.error('Дані не знайдено');
    }
  }, [error, momData, isLoading]);

  if (isLoading) {
    return (
      <div className={styles.momDevelopment}>
        <PuffLoader />
      </div>
    );
  }

  if (error || (!momData && !isLoading)) {
    return (
      <div className={styles.momDevelopment}>
        <PuffLoader />
      </div>
    );
  }

  const safeMomData = momData!;

  return (
    <div className={styles.momDevelopment}>
      <div className={styles.frame}>
        <div className={styles.columnFeel}>
          <div className={styles.feelContainer}>
            <h2 className={styles.feelTitle}>Як ви можете почуватись</h2>

            <div className={styles.tagsContainer}>
              {safeMomData.feelings.states.map((state, index) => (
                <div key={index} className={styles.tag}>
                  <span className={styles.tagText}>{state}</span>
                </div>
              ))}
            </div>

            <p className={styles.feelDescription}>
              {safeMomData.feelings.sensationDescr}
            </p>
          </div>
        </div>

        <div className={styles.columnAdvice}>
          <div className={styles.adviceContainer}>
            <h2 className={styles.adviceTitle}>Поради для вашого комфорту</h2>

            {safeMomData.comfortTips.map((tip, index) => (
              <div key={index} className={styles.adviceItem}>
                <div className={styles.adviceIcon}>
                  <svg className={styles.icon} width="24" height="24">
                    <use
                      href={`/icons.svg#${getIconByCategory(tip.category)}`}
                    />
                  </svg>
                </div>
                <div className={styles.adviceContent}>
                  <h3 className={styles.adviceItemTitle}>{tip.category}</h3>
                  <p className={styles.adviceItemText}>{tip.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <TasksReminderCardJourney />
    </div>
  );
}
