'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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

  const crumbs = segments.map((seg, i) => {
    const href = '/' + segments.slice(0, i + 1).join('/');
    const label = labels[seg] ?? decodeURIComponent(seg);
    return { href, label };
  });

  if (segments.length === 0) {
    crumbs.push({ href: '/', label: labels[''] });
  }

  return (
    <div className={css.container}>
      <nav className={css.breadcrumbs} aria-label="Breadcrumb">
        <ul className={css.list}>
          <li>
            <Link href="/" className={css.home}>
              Лелека
            </Link>
            <svg className={css.icon} width="24" height="24">
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
                  <svg className={css.icon} width="24" height="24">
                    <use href="/icons.svg#icon-chevron_up"></use>
                  </svg>
                </>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
