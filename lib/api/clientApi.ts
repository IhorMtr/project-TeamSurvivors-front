import { NewDiary } from '@/types/diaryEntry';
import { api } from './auth';

export const getDiaries = async () => {
  const response = await api.get('/diaries');
  return response.data.data;
};

export const getDiariesById = async (id: string) => {
  const response = await api.get(`/diaries/${id}`);
  return response.data.data;
};

export const createDiary = async (data: NewDiary) => {
  const response = await api.post('/api/diaries', data);
  return response.data.data;
};

export const deleteDiaryById = async (id: string) => {
  const response = await api.delete(`/diaries/${id}`);
  return response.data;
};
