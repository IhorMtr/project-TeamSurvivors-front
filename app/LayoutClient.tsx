'use client';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import Header from '@/components/Header/Header';
import { useEffect, useState } from 'react';
import css from './LayoutClient.module.css';
import Sidebar from '@/components/Sidebar/Sidebar';
import ConfirmationModal from '@/components/ui/Modal/ConfirmationModal';

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

// Тимчасовий юзер, треба передати з глобального стану
const user = {
  userPhotoUrl: '/avatar-test.png',
  userName: 'Ганна',
  userEmail: 'hanna@gmail.com',
};


export default function LayoutClient({ children }: LayoutClientProps) {
  const isDesktop = useIsDesktop();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [isModalLogoutOpen, setIsModalLogoutOpen] = useState<boolean>(false);
  const requestLogout = () => {
    setIsModalLogoutOpen(true);
  };
  const cancelLogout = () => {
    setSidebarOpen(false);
  };

  // підключити реальний логаут
  const logout = () => {
    return null;
  };

  return (
    <div className={css.layout_wrapper}>
      <aside
        className={`${css.sidebar} ${sidebarOpen ? css.sidebar_open : ''}`}
      >
        <Sidebar
          onClose={() => setSidebarOpen(false)}
          user={user}
          onLogout={() => requestLogout()}
        />
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
      <ConfirmationModal
        isOpen={isModalLogoutOpen}
        title="Ви впевнені що хочете вийти?"
        onConfirm={() => logout()}
        onCancel={() => cancelLogout()}
      />
    </div>
  );
}
