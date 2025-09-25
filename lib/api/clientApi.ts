import { api } from './auth';

export const getDiaries = async () => {
  const response = await api.get('/diaries');
  return response.data;
};

export const getDiariesById = async (id: string) => {
  const response = await api.get(`/diaries/${id}`);
  return response.data;
};
