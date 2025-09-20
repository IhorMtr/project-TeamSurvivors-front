import css from './EmotionIcon.module.css';
export default function EmotionIcon({ emotion }: { emotion: string }) {
  return <div className={css.emotionCard}>{emotion}</div>;
}
