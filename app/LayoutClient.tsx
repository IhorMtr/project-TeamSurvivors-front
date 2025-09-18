'use client';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import Header from '@/components/Header/Header';
import Sidebar from '@/components/Sidebar/Sidebar';
import { useEffect, useState } from 'react';

function useIsDesktop() {
  const [v, setV] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia('(min-width:1440px)');
    const onChange = () => setV(mql.matches);
    onChange(); mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);
  return v;
}

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const isDesktop = useIsDesktop();
  return (
    <div>
      {!isDesktop && <Header />}
      <Sidebar />
      <main>
        <Breadcrumbs />
        {children}
      </main>
    </div>
  );
}