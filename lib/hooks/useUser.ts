import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { userApiService } from '../api/userApi'; // TODO: Uncomment when backend is ready
import { User } from '../api/userApi';
import toast from 'react-hot-toast';

// Query keys
export const USER_QUERIES = {
  current: ['user', 'current'] as const,
};

// Temporary mock data for development - matches API documentation exactly
const MOCK_USER_DATA: User = {
  _id: '65ca67e7ae7f10c88b598384',
  name: 'Kimi Ant',
  email: 'kimia@example.com',
  gender: 'girl',
  dueDate: '2025-12-01',
  photo: 'https://res.cloudinary.com/demo/image/upload/photo.jpg',
};

// Hook for fetching current user profile
export const useCurrentUser = () => {
  return useQuery({
    queryKey: USER_QUERIES.current,
    queryFn: async () => {
      // TODO: Replace with real API call when backend is ready
      // return userApiService.getCurrentUser();
      
      // Simulate API delay for realistic experience
      await new Promise(resolve => setTimeout(resolve, 1000));
      return MOCK_USER_DATA;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};

// Hook for updating user profile
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: Partial<Omit<User, '_id'>>) => {
      // TODO: Replace with real API call when backend is ready
      // return userApiService.updateUser(userData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Return updated mock data
      return { ...MOCK_USER_DATA, ...userData };
    },
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
    mutationFn: async (file: File) => {
      // TODO: Replace with real API call when backend is ready
      // return userApiService.uploadAvatar(file);
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Return a mock photo URL (using a placeholder service)
      return `https://images.unsplash.com/photo-1494790108755-2616b72b5f3c?w=400&h=400&fit=crop&crop=face&t=${Date.now()}`;
    },
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