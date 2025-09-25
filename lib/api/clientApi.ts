import { NewDiary } from '@/types/diaryEntry';
import { User } from '@/types/user';
import { api, ApiResponse } from './auth';
import { ProfileFormData } from '@/utils/schemas/profile';

// Diary API
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

// Profile API
export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get<ApiResponse<User>>('/users/me');
  return response.data.data;
};

export const updateProfile = async (data: ProfileFormData): Promise<User> => {
  const response = await api.patch<ApiResponse<User>>('/users/me', data);
  return response.data.data;
};

export const uploadAvatar = async (file: File): Promise<User> => {
  const formData = new FormData();
  formData.append('photo', file);
  
  const response = await api.patch<ApiResponse<User>>('/users/me/photo', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.data;
};
