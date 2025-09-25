import { User } from '@/types/user';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthStore = {
  isAuthenticated: boolean;
  user: User;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
};

const initialUser: User = {
  email: '',
  name: '',
  photo: '',
  gender: '',
  dueDate: '',
};

export const useAuthStore = create<AuthStore>()(
  persist(
    set => ({
      isAuthenticated: false,
      user: initialUser,
      setUser: (user: User) =>
        set(() => ({
          user,
          isAuthenticated: true,
        })),
      clearIsAuthenticated: () =>
        set(() => ({
          user: initialUser,
          isAuthenticated: false,
        })),
    }),
    {
      name: 'auth-store',
      partialize: state => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
