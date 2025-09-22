import Image from 'next/image';
import css from './DiaryList.module.css';
import Link from 'next/link';
import addIcon from '../../assets/add_circle.svg';
import { DiaryData } from '@/lib/types';
import DiaryEntryCard from '../DiaryEntryCard/DiaryEntryCard';
import DiaryPlaceholder from '../DiaryPlaceholder/DiaryPlaceholder';

export default function DiaryList({ diaries }: { diaries: DiaryData[] }) {
  return (
    <section className={css.diarySection}>
      <div className={css.container}>
        <div className={css.listHeader}>
          <h3 className={css.title}>Ваші записи</h3>
          <div className={css.btnSection}>
            <p className={css.btn_name}>Новий запис</p>
            <Link
              href="/diary"
              className={css.btn}
              onClick={() =>
                alert(
                  'Клік по кнопці "Новий запис" відкриває сторінку створення нового запису'
                )
              }
            >
              <Image src={addIcon} alt="add_btn" width={24} height={24} />
            </Link>
          </div>
        </div>
        {diaries.length > 0 ? (
          diaries.map(diary => (
            <DiaryEntryCard key={diary._id} diaryData={diary} />
          ))
        ) : (
          <DiaryPlaceholder />
        )}
      </div>
    </section>
  );
}
