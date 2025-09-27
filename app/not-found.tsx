'use client';

import { useRouter } from 'next/navigation';
import PageNotFound from '@/components/NotFound/NotFoundPage';
import css from './not-found.module.css';

const NotFoundRedirect = () => {
  const router = useRouter();

  return (
    <div>
      <button
        className={`${css.button} ${css.type1}`}
        onClick={() => router.back()}
      ></button>
      <div className={css['error-message']}>
        «Ця сторінка ще в черзі на народження… тому її тут немає»
      </div>
      <div>
        <PageNotFound />
      </div>
    </div>
  );
};

export default NotFoundRedirect;
