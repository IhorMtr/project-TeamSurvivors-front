import { MyDay } from '@/types/types';
import api from '../api';

export const getMyDay = async (): Promise<MyDay> => {
  const resp = await api.get<{ data: MyDay }>('/api/weeks/my-day-demo');
  return resp.data.data;
};
