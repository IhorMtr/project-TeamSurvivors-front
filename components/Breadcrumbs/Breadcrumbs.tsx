'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import css from './Breadcrumbs.module.css';
import { breadcrumbsStore } from '@/lib/store/breadCrumpsStore';

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  const diaryTitle = breadcrumbsStore((s) => s.diaryTitle);

  const labels: Record<string, string> = {
    '': 'Мій день',
    journey: 'Подорож',
    diary: 'Щоденник',
    profile: 'Профіль',
  };

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
      let label = labels[seg];

      if (segments[0] === 'diary' && i === 1 && diaryTitle) {
        label = diaryTitle;
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