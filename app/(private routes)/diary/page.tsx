'use client';
import DiaryEntryCard from '@/components/DiaryEntryCard/DiaryEntryCard';
import DiaryEntryDetails from '@/components/DiaryEntryDetails/DiaryEntryDetails';
import DiaryList from '@/components/DiaryList/DiaryList';
import css from './page.module.css';
import { useQuery } from '@tanstack/react-query';
import { getDiaries } from '@/lib/api';
import { DiaryData } from '@/lib/types';

type DiariesResponse = {
  data: DiaryData[];
};

export default function DiaryPage() {
  const { data } = useQuery<DiariesResponse>({
    queryKey: ['diaries'],
    queryFn: getDiaries,
  });

  return (
    //TODO:У разі відсутності записів, в блоці зі змістом запису щоденника повинен відображатись плесхолдер з текстом: "Наразі записи у щоденнику відстні"
    <>
      <div className={css.mobileOnly}>
        <DiaryList>
          {data?.data?.map(diary => (
            <DiaryEntryCard key={diary._id} diaryData={diary} />
          ))}
        </DiaryList>
      </div>
      <div className={css.desktopOnly}>
        <DiaryList>
          {data?.data?.map(diary => (
            <DiaryEntryCard key={diary._id} diaryData={diary} />
          ))}
        </DiaryList>
        {data?.data && data.data.length > 0 ? (
          <DiaryEntryDetails diary={data.data[0]} />
        ) : (
          <div className={css.placeholder}>
            Наразі записи у щоденнику відсутні
          </div>
        )}
      </div>
    </>
  );
}
