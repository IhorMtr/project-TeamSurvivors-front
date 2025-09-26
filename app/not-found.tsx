'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PageNotFound from '@/components/NotFound/NotFoundPage';
import css from './not-found.module.css';

const NotFoundRedirect = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(15);

  useEffect(() => {
    if (countdown === 0) {
      router.push('/');
      return;
    }
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, router]);

  return (
    <div>
      <div className={css['error-message']}>
        «Ця сторінка ще в черзі на народження… тому її тут немає»
      </div>
      <div className={css.countdown}>
        «Малюк рахує до {countdown}, і хоп — ти вже на головній!»
      </div>
      <button className={css['home-button']} onClick={() => router.push('/')}>
        ← повернутися на головну
      </button>
      <div>
        <PageNotFound />
      </div>
    </div>
  );
};

export default NotFoundRedirect;
