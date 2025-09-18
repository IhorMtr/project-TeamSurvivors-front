import Image from 'next/image';
import css from './DiaryList.module.css';
import Link from 'next/link';
import { ReactNode } from 'react';

export default function DiaryList({ children }: { children?: ReactNode }) {
  return (
    <section>
      <div className={css.container}>
        <div className={css.listHeader}>
          <h3 className={css.title}>Ваші записи</h3>
          <div className={css.btnSection}>
            <p className={css.btn_name}>Новий запис</p>
            <Link href="/diary/add">
              <Image
                className={css.logo}
                src="/add_circle.svg"
                alt="add_btn"
                width={24}
                height={24}
              />
            </Link>
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}
