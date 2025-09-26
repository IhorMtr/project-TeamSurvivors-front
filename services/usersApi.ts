import { apiClient } from '@/lib/api/client';

export interface User {
    _id: string;
    name: string;
    email: string;
    gender: string;
    dueDate: string;
    photo: string;
}

export const usersApi = {
    getCurrentUser: async (): Promise<User> => {
        const response = await apiClient.get('/users/current');
        return response.data.data;
    }, 
}