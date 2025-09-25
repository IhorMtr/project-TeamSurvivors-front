import axios from 'axios';

// Base API configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://your-api-base-url.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// User interface matching the API documentation
export interface User {
  _id: string;
  name: string;
  email: string;
  gender: 'boy' | 'girl' | '';
  dueDate: string; // YYYY-MM-DD format
  photo: string;
}

// API response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// User API service functions
export const userApiService = {
  // Get current user profile
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<ApiResponse<User>>('/user/current');
    return response.data.data;
  },

  // Update user profile
  updateUser: async (userData: Partial<Omit<User, '_id'>>): Promise<User> => {
    const response = await api.patch<ApiResponse<User>>('/user/current', userData);
    return response.data.data;
  },

  // Upload user avatar
  uploadAvatar: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('photo', file);
    
    const response = await api.patch<ApiResponse<{ photo: string }>>(
      '/user/avatar',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data.data.photo;
  },
};

export default userApiService;