import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true, // обов'язково для httpOnly cookie
});

// interface LogoutResponse {
//   status: number;
//   message: string;
// }

// interface RefreshResponse {
//   status: number;
//   message: string;
//   token?: string;
// }

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  return api.post('/auth/register', data);
};

export const loginUser = async (data: { email: string; password: string }) => {
  return api.post('/auth/login', data);
};

export const logoutUser = () => api.post('/auth/logout');

export const refreshSession = () => api.post('/auth/refresh');

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // якщо токен протух (401) і ще не пробували рефреш
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await api.post('/auth/refresh');
        return api(originalRequest); // повторюємо запит
      } catch (refreshError) {
        console.error('Refresh session failed', refreshError);

        // робимо логаут на фронті (опціонально викликати logoutUser())
        try {
          await api.post('/auth/logout');
        } catch {
          // ігноруємо, якщо сервер вже видалив сесію
        }

        // редірект на логін
        window.location.href = '/auth/login';
      }
    }

    return Promise.reject(error);
  }
);
// export const logoutUser = () => {
//   return api.post<AxiosResponse<LogoutResponse>>("/auth/logout");
// };

// export const refreshSession = () => {
//   return api.post<AxiosResponse<RefreshResponse>>("/auth/refresh");
// };

// import axios, { AxiosResponse } from 'axios';

// const api = axios.create({
//   baseURL: "http://localhost:3000/api", // локальний бекенд
//   withCredentials: true,                // обов'язково для httpOnly cookie
// });

// interface LogoutResponse {
//   status: number;
//   message: string;
// }

// interface RefreshResponse {
//   status: number;
//   message: string;
//   token?: string;
// }

// export const registerUser = async (data: { username: string; email: string; password: string }) => {
//   return api.post("/auth/register", data);
// };

// export const loginUser = async (data: { email: string; password: string }) => {
//   return api.post("/auth/login", data);
// };

// export const logoutUser = () => {
//   return api.post<AxiosResponse<LogoutResponse>>("/auth/logout");
// };

// export const refreshSession = () => {
//   return api.post<AxiosResponse<RefreshResponse>>("/auth/refresh");
// };
