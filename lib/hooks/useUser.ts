import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCurrentUser, updateProfile, uploadAvatar } from '../api/clientApi';
import { User } from '@/types/user';
import { ProfileFormData } from '@/utils/schemas/profile';
import toast from 'react-hot-toast';

// Query keys
export const USER_QUERIES = {
  current: ['user', 'current'] as const,
};



// Hook for fetching current user profile
export const useCurrentUser = () => {
  return useQuery({
    queryKey: USER_QUERIES.current,
    queryFn: getCurrentUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};

// Hook for updating user profile
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: ProfileFormData) => updateProfile(userData),
    onSuccess: (updatedUser) => {
      // Update the cached user data
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

// Hook for uploading avatar
export const useUploadAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => uploadAvatar(file),
    onSuccess: (photoUrl) => {
      // Update the cached user data with new photo URL
      queryClient.setQueryData(USER_QUERIES.current, (oldData: User | undefined) => {
        if (oldData) {
          return { ...oldData, photo: photoUrl };
        }
        return oldData;
      });
      toast.success('Фото успішно завантажено!');
    },
    onError: (error: Error) => {
      const errorMessage = 'Помилка при завантаженні фото';
      toast.error(errorMessage);
      console.error('Upload avatar error:', error);
    },
  });
};