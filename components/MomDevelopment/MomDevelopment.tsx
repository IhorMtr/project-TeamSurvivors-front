'use client';

import { useWeekData } from '@/lib/hooks/useWeekData';
import styles from './MomDevelopment.module.css';
import { PuffLoader } from 'react-spinners';
import TasksReminderCardJourney from '../TasksReminderCardJourney/TasksReminderCardJourney';
import Image from 'next/image';

interface MomDevelopmentProps {
  weekNumber: number;
}

const getIconByCategory = (category: string) => {
  switch (category) {
    case 'Харчування':
      return '/fork_spoon.svg';
    case 'Гігієна':
    case 'Активність':
      return '/fitness_center.svg';
    case 'Самопочуття':
    case 'Відпочинок та комфорт':
      return '/chair.svg';
    default:
      return '/fork_spoon.svg';
  }
};

export default function MomDevelopment({ weekNumber }: MomDevelopmentProps) {
  const { momData, isLoading, error } = useWeekData(weekNumber);

  if (isLoading) {
    return (
      <div className={styles.momDevelopment}>
        <div className={styles.loading}>
          <PuffLoader />
          <span>Завантаження даних...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.momDevelopment}>
        <div className={styles.error}>Помилка завантаження даних</div>
      </div>
    );
  }

  if (!momData) {
    return (
      <div className={styles.momDevelopment}>
        <div className={styles.error}>Дані не знайдено</div>
      </div>
    );
  }

  return (
    <div className={styles.momDevelopment}>
      <div className={styles.frame}>
        <div className={styles.columnFeel}>
          <div className={styles.feelContainer}>
            <h2 className={styles.feelTitle}>Як ви можете почуватись</h2>

            <div className={styles.tagsContainer}>
              {momData.feelings.states.map((state, index) => (
                <div key={index} className={styles.tag}>
                  <span className={styles.tagText}>{state}</span>
                </div>
              ))}
            </div>

            <p className={styles.feelDescription}>
              {momData.feelings.sensationDescr}
            </p>
          </div>
        </div>

        <div className={styles.columnAdvice}>
          <div className={styles.adviceContainer}>
            <h2 className={styles.adviceTitle}>Поради для вашого комфорту</h2>

            {momData.comfortTips.map((tip, index) => (
              <div key={index} className={styles.adviceItem}>
                <div className={styles.adviceIcon}>
                  <Image
                    src={getIconByCategory(tip.category)}
                    alt={tip.category}
                    width="24"
                    height="24"
                  />
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
