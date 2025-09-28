'use client';

import { useEffect } from 'react';
import { useWeekData } from '@/lib/hooks/useWeekData';
import styles from './BabyDevelopment.module.css';
import { PuffLoader } from 'react-spinners';
import Image from 'next/image';
import { toast } from 'react-hot-toast';

interface BabyDevelopmentProps {
  weekNumber: number;
}

export default function BabyDevelopment({ weekNumber }: BabyDevelopmentProps) {
  const { babyData, isLoading, error } = useWeekData(weekNumber);

  useEffect(() => {
    if (error) {
      toast.error('Помилка завантаження даних');
    }
    if (!isLoading && !babyData && !error) {
      toast.error('Дані не знайдено');
    }
  }, [error, babyData, isLoading]);

  if (isLoading) {
    return (
      <div className={styles.babyDevelopment}>
        <PuffLoader />
      </div>
    );
  }

  if (error || (!babyData && !isLoading)) {
    return (
      <div className={styles.babyDevelopment}>
        <PuffLoader />
      </div>
    );
  }

  return (
    <div className={styles.babyDevelopment}>
      <div className={styles.sizeContainer}>
        <div className={styles.imagePlaceholder}>
          {babyData?.image ? (
            <Image
              src={babyData.image}
              alt={`Розвиток дитини на ${weekNumber} тижні`}
              width={300}
              height={400}
              className={styles.babyImage}
            />
          ) : (
            <PuffLoader />
          )}
        </div>
        <h3 className={styles.sizeTitle}>
          Ваш малюк зараз розміром з {babyData?.analogy}
        </h3>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.textContent}>
          <p>{babyData?.babyDevelopment}</p>
        </div>

        <div className={styles.funFact}>
          <div className={styles.funFactHeader}>
            <Image
              src="/star.svg"
              alt="Виконано"
              width={14}
              height={12}
              className={styles.starFact}
            />
            <h4 className={styles.funFactTitle}>Цікавий факт</h4>
          </div>
          <p className={styles.funFactText}>{babyData?.interestingFact}</p>
        </div>
      </div>
    </div>
  );
}
