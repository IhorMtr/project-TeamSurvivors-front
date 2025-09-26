import { NewDiary } from '@/types/diaryEntry';
import { api, ApiResponse } from './auth';
import { User } from './userApi';

export const getDiaries = async () => {
  const response = await api.get('/diaries');
  return response.data.data;
};

export const getDiariesById = async (id: string) => {
  const response = await api.get(`/diaries/${id}`);
  return response.data.data;
};

export const createDiary = async (data: NewDiary) => {
  const response = await api.post('/diaries', data);
  return response.data.data;
};

export async function getCurrentUser(): Promise<User> {
  const res = await api.get<ApiResponse<User>>('/users/me');
  return res.data.data;
}
