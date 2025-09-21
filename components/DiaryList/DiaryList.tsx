import Image from 'next/image';
import css from './DiaryList.module.css';
import Link from 'next/link';
import { ReactNode } from 'react';
import addIcon from '../../assets/add_circle.svg';
export default function DiaryList({ children }: { children?: ReactNode }) {
  return (
    <section className={css.diarySection}>
      <div className={css.container}>
        <div className={css.listHeader}>
          <h3 className={css.title}>Ваші записи</h3>
          <div className={css.btnSection}>
            <p className={css.btn_name}>Новий запис</p>
            <Link href="/diary/add" className={css.btn}>
              <Image src={addIcon} alt="add_btn" width={24} height={24} />
            </Link>
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}
