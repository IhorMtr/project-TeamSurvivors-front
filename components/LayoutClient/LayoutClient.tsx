'use client';

import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import Header from '@/components/Header/Header';
import Sidebar from '@/components/Sidebar/Sidebar';
import ConfirmationModal from '@/components/ui/Modal/ConfirmationModal';
import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { logoutUser } from '@/lib/api/auth';
import css from './LayoutClient.module.css';
import OnboardingGuard from '../OnboardingGuard/OnboardingGuard';

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
  const [isModalLogoutOpen, setIsModalLogoutOpen] = useState(false);

  const { user, isAuthenticated, clearIsAuthenticated } = useAuthStore();
  const router = useRouter();

  const requestLogout = () => setIsModalLogoutOpen(true);
  const cancelLogout = () => setIsModalLogoutOpen(false);

  const logout = async () => {
    try {
      await logoutUser();
      toast.success('Ви успішно вийшли');
    } catch {
      toast.error('Сталася помилка при виході');
    } finally {
      clearIsAuthenticated();
      setIsModalLogoutOpen(false);
      router.push('/auth/login');
    }
  };

  return (
    <OnboardingGuard>
      <div className={css.layout_wrapper}>
        <aside
          className={`${css.sidebar} ${sidebarOpen ? css.sidebar_open : ''}`}
        >
          <Sidebar
            onClose={() => setSidebarOpen(false)}
            user={
              isAuthenticated
                ? {
                    userPhotoUrl: user?.photo || '/default-avatar.png',
                    userName: user?.name,
                    userEmail: user?.email,
                  }
                : null
            }
            onLogout={requestLogout}
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
              <Breadcrumbs />
            </section>
            {children}
          </main>
        </div>

        <ConfirmationModal
          isOpen={isModalLogoutOpen}
          title="Ви впевнені що хочете вийти?"
          onConfirm={logout}
          onCancel={cancelLogout}
        />
      </div>
    </OnboardingGuard>
  );
}
