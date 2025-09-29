import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCurrentUser, updateProfile, uploadAvatar } from '../api/clientApi';
import { User } from '@/types/user';
import { ProfileFormData } from '@/utils/schemas/profile';
import toast from 'react-hot-toast';

export const USER_QUERIES = {
  current: ['user', 'current'] as const,
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: USER_QUERIES.current,
    queryFn: getCurrentUser,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: ProfileFormData) => updateProfile(userData),
    onSuccess: updatedUser => {
      queryClient.setQueryData(USER_QUERIES.current, updatedUser);
      toast.success('Профіль успішно оновлено!');
    },
    onError: (error: Error) => {
      const errorMessage = 'Помилка при оновленні профілю';
      toast.error(errorMessage);
      console.error('Update user error:', error);
    },
  });
};

export const useUploadAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => uploadAvatar(file),
    onSuccess: (updatedUser: User) => {
      queryClient.setQueryData(USER_QUERIES.current, updatedUser);
      queryClient.invalidateQueries({ queryKey: USER_QUERIES.current });
      toast.success('Фото успішно завантажено!');
    },
    onError: (error: Error) => {
      toast.error('Помилка при завантаженні фото');
      console.error('Upload avatar error:', error);
    },
  });
};
