'use client';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import Header from '@/components/Header/Header';
import { useEffect, useState } from 'react';
import css from './LayoutClient.module.css';
import Sidebar from '@/components/Sidebar/Sidebar';

function useIsDesktop() {
  const [v, setV] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia('(min-width:1440px)');
    const onChange = () => setV(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);
  return v;
}

type LayoutClientProps = {
  children: React.ReactNode;
};

export default function LayoutClient({ children }: LayoutClientProps) {
  const isDesktop = useIsDesktop();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={css.layout_wrapper}>
      <aside
        className={`${css.sidebar} ${sidebarOpen ? css.sidebar_open : ''}`}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </aside>
      <div
        className={`${css.backdrop} ${sidebarOpen ? css.backdrop_show : ''}`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden={!sidebarOpen}
      />
      <div className={css.main_wrapper}>
        {!isDesktop && (
          <div className={css.header_wrapper}>
            <Header onOpenSidebar={() => setSidebarOpen(true)} />
          </div>
        )}
        <main className={css.container}>
          <section className={css.section}>
            <div className={css.breadcrumbs_wrapper}>
              <Breadcrumbs />
            </div>
            {children}
          </section>
        </main>
      </div>
    </div>
  );
}
