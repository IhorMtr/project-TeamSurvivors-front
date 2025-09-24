import { create } from 'zustand';
import { DiaryData } from '@/types/types';

type DiaryState = {
  selectedDiary: DiaryData | null;
  setSelectedDiary: (diary: DiaryData | null) => void;
};

export const useDiaryStore = create<DiaryState>(set => ({
  selectedDiary: null,
  setSelectedDiary: diary => set({ selectedDiary: diary }),
}));
