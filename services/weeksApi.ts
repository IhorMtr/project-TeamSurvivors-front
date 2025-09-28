import { api } from '@/lib/api/auth';

export interface BabyState {
  _id: string;
  weekNumber: number;
  analogy: string;
  image: string;
  babyDevelopment: string;
  interestingFact: string;
}

export interface MomState {
  _id: string;
  weekNumber: number;
  feelings: {
    states: string[];
    sensationDescr: string;
  };
  comfortTips: Array<{
    category: string;
    tip: string;
  }>;
}

export interface MyDayData {
  weekNumber: number;
  analogy: string;
  image: string;
  babyDevelopment: string;
  interestingFact: string;
}

export const weeksApi = {
  getBabyState: async (weekNumber: number): Promise<BabyState> => {
    const response = await api.get(`/weeks/baby-state/${weekNumber}`);
    return response.data.data;
  },

  getMomState: async (weekNumber: number): Promise<MomState> => {
    const response = await api.get(`/weeks/mom-state/${weekNumber}`);
    return response.data.data;
  },
};
