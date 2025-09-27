'use client';

import { useQuery } from '@tanstack/react-query';
import { weeksApi } from '@/services/weeksApi';



export const useWeekData = (weekNumber: number) => {

  const {
    data: babyData,
    isLoading: isLoadingBaby,
    error: babyError,
  } = useQuery({
    queryKey: ['babyState', weekNumber],
    queryFn: () => weeksApi.getBabyState(weekNumber),
    enabled: !!weekNumber,
    retry: 1,
  });

  const {
    data: momData,
    isLoading: isLoadingMom,
    error: momError,
  } = useQuery({
    queryKey: ['momState', weekNumber],
    queryFn: () => weeksApi.getMomState(weekNumber),
    enabled: !!weekNumber,
    retry: 1,
  });

  return {
    babyData,
    momData,
    isLoading: isLoadingBaby || isLoadingMom,
    error: babyError || momError,
  };
};

 