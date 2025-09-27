import { MyDay } from '@/types/types';
import { api } from './auth';

export const getMyDay = async (): Promise<MyDay> => {
  const resp = await api.get<{ data: MyDay }>('/weeks/my-day-demo');
  return resp.data.data;
};

export const getMyDayProfile = async (
  estimateBirthDate: string
): Promise<MyDay> => {
  const resp = await api.get<{ data: MyDay }>(
    `weeks/my-day/${estimateBirthDate}`
  );
  return resp.data.data;
};
