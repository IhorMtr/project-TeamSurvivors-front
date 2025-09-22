import { DiaryData } from '@/lib/types';
import EmotionIcon from '../EmotionIcon/EmotionIcon';
import EmotionIconContainer from '../EmotionIconContainer/EmotionIconContainer';
import css from './DiaryEntryCard.module.css';

export default function DiaryEntryCard({ diaryData }: { diaryData: DiaryData }) {
  console.log(diaryData);
  return (
    <div className={css.card}>
      <div className={css.headerCard}>
        <div className={css.headerTitle}>{diaryData.title}</div>
        <div className={css.headerDate}>{diaryData.date}</div>
      </div>
      <div>
        <EmotionIconContainer>
          {diaryData.emotions.map(emotion => (
            <EmotionIcon key={emotion._id} emotion={emotion.title} />
          ))}
        </EmotionIconContainer>
      </div>
    </div>
  );
}