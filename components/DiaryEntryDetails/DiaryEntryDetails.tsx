import Image from 'next/image';
import css from './DiaryEntryDetails.module.css';
import Link from 'next/link';
import EmotionIconContainer from '../EmotionIconContainer/EmotionIconContainer';
import EmotionIcon from '../EmotionIcon/EmotionIcon';
import editIcon from '../../assets/edit.svg';
import deleteIcon from '../../assets/delete.svg';
import { DiaryData } from '@/lib/types';

export default function DiaryEntryDetails({ diary }: { diary: DiaryData }) {
  return (
    <section className={css.container}>
      <div className={css.detailHeader}>
        <div className={css.detailTitle}>
          <h3 className={css.title}>{diary.title}</h3>
          <Link className={css.btn} href={`/diary/edit/${diary._id}`}>
            <Image src={editIcon} alt="edit_btn" width={24} height={24} />
          </Link>
        </div>
        <div className={css.detailDate}>
          <div>{diary.date}</div>
          {/* TODO: Implement delete functionality, likely with a mutation */}
          <button
            className={css.btn}
            onClick={() => alert('Delete not implemented')}
          >
            <Image src={deleteIcon} alt="delete_btn" width={24} height={24} />
          </button>
        </div>
      </div>
      <p className={css.text}>{diary.description}</p>
      <EmotionIconContainer>
        {diary.emotions.map(emotion => (
          <EmotionIcon key={emotion._id} emotion={emotion.title} />
        ))}
      </EmotionIconContainer>
    </section>
  );
}