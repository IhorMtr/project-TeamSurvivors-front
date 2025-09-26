import Image from 'next/image';
import css from './DiaryEntryDetails.module.css';
import Link from 'next/link';
import EmotionIconContainer from '../EmotionIconContainer/EmotionIconContainer';
import EmotionIcon from '../EmotionIcon/EmotionIcon';
import editIcon from '../../assets/edit.svg';
import deleteIcon from '../../assets/delete.svg';
import { DiaryData } from '@/types/types';

export default function DiaryEntryDetails({ diary }: { diary?: DiaryData }) {
  return (
    <section className={css.container}>
      <div className={css.detailHeader}>
        <div className={css.detailTitle}>
          <h3 className={css.title}>{diary?.title || ''}</h3>
          {diary && (
            <Link
              className={css.btn}
              href={'/diary'}
              onClick={() =>
                alert(
                  'Клік по кнопці "Редагувати" відкриває сторінку редагування'
                )
              }
            >
              <Image src={editIcon} alt="edit_btn" width={24} height={24} />
            </Link>
          )}
        </div>

        <div className={css.detailDate}>
          <div>{diary?.date}</div>
          {diary && (
            <button
              className={css.btn}
              onClick={() =>
                alert(
                  'Клік по кнопці "Видалити" відкриває модальне вікно ConfirmationModal'
                )
              }
            >
              <Image src={deleteIcon} alt="delete_btn" width={24} height={24} />
            </button>
            //TODO: додати функціонал відкриття модалки для редагування та видалення
          )}
        </div>
      </div>
      <p className={css.text}>{diary?.description}</p>
      <EmotionIconContainer>
        {diary?.emotions?.map(emotion => (
          <EmotionIcon key={emotion._id} emotion={emotion.title} />
        ))}
      </EmotionIconContainer>
    </section>
  );
}
