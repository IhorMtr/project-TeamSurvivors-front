'use client';

import { useWeekData } from '@/hooks/useWeekData';
import styles from './BabyDevelopment.module.css';
// import { PuffLoader } from 'react-spinners';

interface BabyDevelopmentProps {
  weekNumber: number;
}

export default function BabyDevelopment({ weekNumber }: BabyDevelopmentProps) {
  const { babyData, isLoading, error } = useWeekData(weekNumber);

  if (isLoading) {
    return (
      <div className={styles.babyDevelopment}>
        {/* <div className={styles.loading}>
          <PuffLoader />
          <span>Завантаження даних...</span>
        </div> */}
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.babyDevelopment}>
        <div className={styles.error}>Помилка завантаження даних</div>
      </div>
    );
  }

  if (!babyData) {
    return (
      <div className={styles.babyDevelopment}>
        <div className={styles.error}>Дані не знайдено</div>
      </div>
    );
  }


  return (
    <div className={styles.babyDevelopment}>
      <div className={styles.sizeContainer}>
        <div className={styles.imagePlaceholder}>
          {babyData.image ? (
            <img 
              src={babyData.image} 
              alt={`Розвиток дитини на ${weekNumber} тижні`}
              width={300}
              height={400}
              className={styles.babyImage}
            />
          ) : (
            <span className={styles.placeholderText}>Зображення</span>
          )}
        </div>
        <h3 className={styles.sizeTitle}>
          Ваш малюк зараз розміром з {babyData.analogy}
        </h3>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.textContent}>
          <p>{babyData.babyDevelopment}</p>
        </div>
        
        <div className={styles.funFact}>
          <div className={styles.funFactHeader}>
          <img src="/star.svg" alt="Виконано" width="14" height="12" className={styles.starFact}/>
            <h4 className={styles.funFactTitle}>Цікавий факт</h4>
          </div>
          <p className={styles.funFactText}>{babyData.interestingFact}</p>
        </div>
      </div>
    </div>
  );

}