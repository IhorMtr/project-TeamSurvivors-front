import { User } from '@/types/user';
import axios, { AxiosInstance } from 'axios';

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}
export interface RegisterResponse {
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}
export interface LoginResponse {
  accessToken: string;
}

export interface RefreshResponse {
  accessToken: string;
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export const api: AxiosInstance = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

export async function registerUser(
  data: RegisterRequest
): Promise<RegisterResponse> {
  const res = await api.post<ApiResponse<RegisterResponse>>(
    '/auth/register',
    data
  );
  return res.data.data;
}

export async function loginUser(data: LoginRequest): Promise<LoginResponse> {
  const res = await api.post<ApiResponse<LoginResponse>>('/auth/login', data);
  const { accessToken } = res.data.data;
  api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  return res.data.data;
}

export async function refreshSession(): Promise<RefreshResponse> {
  const res = await api.post<ApiResponse<RefreshResponse>>('/auth/refresh');
  const { accessToken } = res.data.data;
  api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  return res.data.data;
}

export async function logoutUser(): Promise<void> {
  await api.post<ApiResponse<null | undefined>>('/auth/logout');
  delete api.defaults.headers.common.Authorization;
}
