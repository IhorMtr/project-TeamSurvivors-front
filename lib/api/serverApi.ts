import { nextServer } from './nextServer';

export const getDiaries = async () => {
  const api = await nextServer();
  const response = await api.get('/diaries');
  return response.data;
};

export const getDiariesById = async (id: string) => {
  const api = await nextServer();
  const response = await api.get(`/diaries/${id}`);
  return response.data;
};
