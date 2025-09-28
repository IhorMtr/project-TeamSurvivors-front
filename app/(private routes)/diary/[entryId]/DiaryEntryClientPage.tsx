'use client';

import DiaryEntryDetails from '@/components/DiaryEntryDetails/DiaryEntryDetails';
import { getDiariesById } from '@/lib/api/clientApi';
import { DiaryData } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import { PuffLoader } from 'react-spinners';
import css from './DiaryEntryClientPage.module.css';
import { breadcrumbsStore } from '@/lib/store/breadCrumpsStore';
import { useEffect } from 'react';

export default function DiaryEntryClientPage({ entryId }: { entryId: string }) {
  const {
    data: diary,
    isLoading,
    isError,
    error,
  } = useQuery<DiaryData>({
    queryKey: ['diaries', entryId],
    queryFn: () => getDiariesById(entryId),
    enabled: !!entryId,
  });


//Note title for breadcrumbs
  const setDiaryTitle = breadcrumbsStore((s) => s.setDiaryTitle);
  useEffect(() => {
    if (diary?.title) {
      setDiaryTitle(diary.title);
    }
    return () => setDiaryTitle(undefined);
  }, [diary?.title, setDiaryTitle]);
//Note title for breadcrumbs


  if (isLoading) {
    return (
      <div className={css.loaderContainer}>
        <PuffLoader />
      </div>
    );
  }

  if (isError) {
    return <div>Error fetching diary: {error.message}</div>;
  }

  if (!diary) {
    return <div>Diary entry not found.</div>;
  }

  return <DiaryEntryDetails diary={diary} />;
}
