import EmotionIcon from '../EmotionIcon/EmotionIcon';
import EmotionIconContainer from '../EmotionIconContainer/EmotionIconContainer';
import css from './DiaryEntryCard.module.css';

export default function DiaryEntryCard() {
  return (
    // TODO: add date
    <div className={css.card}>
      <div className={css.headerCard}>
        <div className={css.headerTitle}>Дивне бажання</div>
        <div className={css.headerDate}> 9 липня 2025</div>
      </div>
      <div>
        <EmotionIconContainer>
          <EmotionIcon emotion="Натхнення" />
          <EmotionIcon emotion="дивні бажання" />
        </EmotionIconContainer>
      </div>
    </div>
  );
}
