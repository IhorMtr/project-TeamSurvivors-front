'use client';

import styles from "./WeekButton.module.css";

interface WeekButtonProps {
  weekNumber: number;
  isCurrent?: boolean;
  isDisabled?: boolean;
}

const WeekButton = ({
  weekNumber,
  isCurrent = false,
  isDisabled = false,
}: WeekButtonProps) => {
  return (
    <div className={`
      ${styles.weekButton} 
      ${isCurrent ? styles.weekButtonCurrent : ''}
      ${isDisabled ? styles.weekButtonDisabled : ''}
    `}>
      <div className={styles.weekButtonContent}>
        <div className={styles.weekNumber}>{weekNumber}</div>
        <div className={styles.weekLabel}>Тиждень</div>
      </div>
    </div>
  );
};

export default WeekButton;