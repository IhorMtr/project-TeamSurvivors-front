import { create } from 'zustand';

type BreadcrumbsState = {
  diaryTitle?: string;
  setDiaryTitle: (title?: string) => void;
};

export const breadcrumbsStore = create<BreadcrumbsState>((set) => ({
  diaryTitle: undefined,
  setDiaryTitle: (title) => set({ diaryTitle: title }),
}));