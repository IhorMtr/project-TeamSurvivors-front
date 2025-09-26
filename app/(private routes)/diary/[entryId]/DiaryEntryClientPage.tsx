'use client';

import DiaryEntryDetails from '@/components/DiaryEntryDetails/DiaryEntryDetails';
import { getDiariesById } from '@/lib/api/clientApi';
import { DiaryData } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import { PuffLoader } from 'react-spinners';
import css from './DiaryEntryClientPage.module.css';

type DiariesResponse = {
  data: DiaryData;
};

// This component now accepts entryId directly
export default function DiaryEntryClientPage({ entryId }: { entryId: string }) {
  const { data, isLoading, isError, error } = useQuery<DiariesResponse>({
    queryKey: ['diaries', entryId],
    queryFn: () => getDiariesById(entryId),
    enabled: !!entryId,
  });

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

  const diary = data?.data;

  if (!diary) {
    return <div>Diary entry not found.</div>; //Скорее все не нужно, но пусть пока будет
  }

  return <DiaryEntryDetails diary={diary} />;
}
