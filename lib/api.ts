import axios from 'axios';

const api = axios.create({
  baseURL: 'https://project-teamsurvivors.onrender.com',
  withCredentials: true,
});

// Interceptor to add auth token to requests
api.interceptors.request.use(
  config => {
    if (typeof window !== 'undefined') {
      const token = 'ac+3wOwHIqdtuaL3PqE+DpLXB60ddijHHZf4AGjt';

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
export const deleteDiaryById = async (id: string) => {
  return await api.delete(`/api/diaries/${id}`);
};
export default api;
