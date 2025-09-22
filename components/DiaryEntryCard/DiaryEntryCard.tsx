'use client';
import { DiaryData } from '@/lib/types';
import EmotionIcon from '../EmotionIcon/EmotionIcon';
import EmotionIconContainer from '../EmotionIconContainer/EmotionIconContainer';
import css from './DiaryEntryCard.module.css';
import { useDiaryStore } from '@/lib/store/diaryStore';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useRouter } from 'next/navigation';
import { formatDate } from '@/lib/utils';

export default function DiaryEntryCard({ diaryData }: { diaryData: DiaryData }) {
  const setSelectedDiary = useDiaryStore(state => state.setSelectedDiary);
  const isDesktop = useMediaQuery('(min-width: 1440px)');
  const router = useRouter();

  const handleClick = () => {
    if (isDesktop) {
      setSelectedDiary(diaryData);
    } else {
      router.push(`/diary/${diaryData._id}`);
    }
  };

  return (
    <button onClick={handleClick} className={css.card}>
      <div className={css.headerCard}>
        <div className={css.headerTitle}>{diaryData.title}</div>
        <div className={css.headerDate}>{formatDate(diaryData.date)}</div>
      </div>
      <div>
        <EmotionIconContainer>
          {diaryData.emotions.map(emotion => (
            <EmotionIcon key={emotion._id} emotion={emotion.title} />
          ))}
        </EmotionIconContainer>
      </div>
    </button>
  );
}