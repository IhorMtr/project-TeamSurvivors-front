'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getDiariesById } from '@/lib/api/clientApi';
import { DiaryData } from '@/types/types';
import css from './Breadcrumbs.module.css';

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  const labels: Record<string, string> = {
    '': 'Мій день',
    journey: 'Подорож',
    diary: 'Щоденник',
    profile: 'Профіль',
  };

  
  const entryId = segments[0] === 'diary' && segments[1] ? segments[1] : undefined;


  const { data: diary } = useQuery<DiaryData>({
    queryKey: ['diaries', entryId],
    queryFn: () => getDiariesById(entryId as string),
    enabled: !!entryId,
  });


  let crumbs: { href: string; label: string }[] = [];


  if (segments.length === 0) {
    crumbs = [{ href: '/', label: labels[''] }];
  }
  

  else if (segments[0] === 'journey') {
    crumbs = [{ href: '/journey', label: labels.journey }];
  }
  
  
  else {
    crumbs = segments.map((seg, i) => {
      const href = '/' + segments.slice(0, i + 1).join('/');
      let label = labels[seg] ?? decodeURIComponent(seg);
      if (segments[0] === 'diary' && i === 1 && diary?.title) {
        label = diary.title;
      }
      return { href, label };
    });
  }

  return (
    <nav className={css.breadcrumbs} aria-label="Breadcrumb">
      <ul className={css.list}>
        <li>
          <Link href="/" className={css.home}>Лелека</Link>
          <svg className={css.icon} width="24" height="24" aria-hidden="true">
            <use href="/icons.svg#icon-chevron_up"></use>
          </svg>
        </li>

        {crumbs.map((c, i) => (
          <li key={c.href}>
            {i === crumbs.length - 1 ? (
              <span className={css.current}>{c.label}</span>
            ) : (
              <>
                <Link href={c.href}>{c.label}</Link>
                <svg className={css.icon} width="24" height="24" aria-hidden="true">
                  <use href="/icons.svg#icon-chevron_up"></use>
                </svg>
              </>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}