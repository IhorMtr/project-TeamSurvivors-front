import  axios from 'axios';

const BASE_URL = 'https://project-teamsurvivors.onrender.com/api';
 

export const apiClient = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, 
});

apiClient.interceptors.request.use((config) => {
    if(typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
  }
    return config;
});

apiClient.interceptors.response.use(
    (response) => {
        if(response.data?.data?.accessToken) {
         localStorage.setItem('accessToken', response.data.data.accessToken);
        }
        return response;
    },
    async (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('accessToken');
          window.location.href = '/auth/login';
        }
        return Promise.reject(error);
    }
)


