'use client';
import DiaryList from '@/components/DiaryList/DiaryList';
import DiaryEntryDetails from '@/components/DiaryEntryDetails/DiaryEntryDetails';
import css from './page.module.css';
import { useQuery } from '@tanstack/react-query';
import { getDiaries } from '@/lib/api';
import { DiaryData } from '@/types/types';
import { PuffLoader } from 'react-spinners';
import { useDiaryStore } from '@/lib/store/diaryStore';
import { useEffect } from 'react';

type DiariesResponse = {
  data: DiaryData[];
};

export default function DiaryPage() {
  const { selectedDiary, setSelectedDiary } = useDiaryStore();

  const { data, isLoading } = useQuery<DiariesResponse>({
    queryKey: ['diaries'],
    queryFn: getDiaries,
  });

  const diaries = data?.data || [];

  useEffect(() => {
    if (data) {
      const currentDiaries = data.data || [];
      const currentSelected = useDiaryStore.getState().selectedDiary;

      if (currentDiaries.length > 0) {
        if (
          !currentSelected ||
          !currentDiaries.some(d => d._id === currentSelected._id)
        ) {
          setSelectedDiary(currentDiaries[0]);
        }
      } else {
        setSelectedDiary(null);
      }
    }
  }, [data, setSelectedDiary]);

  if (isLoading) {
    return (
      <div className={css.loaderContainer}>
        <PuffLoader />
      </div>
    );
  }

  return (
    <>
      <div className={css.mobileOnly}>
        <DiaryList diaries={diaries} />
      </div>
      <div className={css.desktopOnly}>
        <DiaryList diaries={diaries} />
        {selectedDiary && <DiaryEntryDetails diary={selectedDiary} />}
      </div>
    </>
  );
}
