'use client';

import React from 'react';
import styles from './WeekButton.module.css';

interface WeekButtonProps {
  weekNumber: number;
  isCurrent?: boolean;
  isDisabled?: boolean;
  onClick: () => void;
}

const WeekButton: React.FC<WeekButtonProps> = ({
  weekNumber,
  isCurrent,
  isDisabled,
  onClick,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isDisabled) {
      e.preventDefault();
      return;
    }
    onClick();
  };

  return (
    <button
      className={`
        ${styles.weekButton} 
        ${isCurrent ? styles.weekButtonCurrent : ''}
        ${isDisabled ? styles.weekButtonDisabled : ''}
      `}
      aria-disabled={isDisabled}
      onClick={handleClick}
    >
      <div className={styles.weekButtonContent}>
        <span className={styles.weekNumber}>{weekNumber}</span>
        <span className={styles.weekLabel}>Тиждень</span>
      </div>
    </button>
  );
};

export default WeekButton;
