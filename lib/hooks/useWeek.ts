'use client';

import { useMemo } from 'react';

export function useWeek(dueDate: string | null) {
  return useMemo(() => {
    if (!dueDate) return null;

    const d = new Date(dueDate);
    if (isNaN(d.getTime())) return null;

    const today = new Date();
    d.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diffMs = d.getTime() - today.getTime();
    const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    const daysPassed = 294 - daysLeft;
    const currentWeek = Math.floor(daysPassed / 7) + 1;

    return currentWeek > 0 ? currentWeek : 1;
  }, [dueDate]);
}
