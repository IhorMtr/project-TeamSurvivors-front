'use client';
import DiaryList from '@/components/DiaryList/DiaryList';
import DiaryEntryDetails from '@/components/DiaryEntryDetails/DiaryEntryDetails';
import css from './page.module.css';
import { useQuery } from '@tanstack/react-query';
import { getDiaries } from '@/lib/api/clientApi';
import { DiaryData } from '@/types/types';
import { PuffLoader } from 'react-spinners';
import { useDiaryStore } from '@/lib/store/diaryStore';
import { useEffect } from 'react';

export default function DiaryPage() {
  const { selectedDiary, setSelectedDiary } = useDiaryStore();

  const { data: diaries = [], isLoading } = useQuery<DiaryData[]>({
    queryKey: ['diaries'],
    queryFn: getDiaries,
  });

  useEffect(() => {
    if (diaries.length > 0) {
      const currentSelected = useDiaryStore.getState().selectedDiary;
      if (
        !currentSelected ||
        !diaries.some(d => d._id === currentSelected._id)
      ) {
        setSelectedDiary(diaries[0]);
      }
    } else {
      if (useDiaryStore.getState().selectedDiary !== null) {
        setSelectedDiary(null);
      }
    }
  }, [diaries, setSelectedDiary]);

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
