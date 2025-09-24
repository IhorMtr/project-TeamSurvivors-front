import { NewDiary } from '@/types/diaryEntry';
import axios from 'axios';
import cookie from 'cookie';


const api = axios.create({
  baseURL: 'https://project-teamsurvivors.onrender.com',
  withCredentials: true,
});

// Interceptor to add auth token to requests from cookies
api.interceptors.request.use(
  config => {
    if (typeof window !== 'undefined') {
            const cookies = cookie.parse(document.cookie);
      //   const token = cookies.authToken;
      const token = 'E3wbvlxiS7fLPp4MuAW6QIXmBc01hiR+LBtDYTM7';

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export const getDiaries = async () => {
  const response = await api.get('/api/diaries');
  return response.data;
};

export const getDiariesById = async (id: string) => {
  const response = await api.get(`/api/diaries/${id}`);
  return response.data;
};

export const createDiary = async (data: NewDiary) => {
  const response = await api.post('/api/diaries', data);
  return response.data;
}
export default api;
