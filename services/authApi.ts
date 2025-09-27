import { apiClient } from "@/lib/api/client";

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
}

export const authApi = {
    login: async (credentials: LoginData) => {
        const response = await apiClient.post('/auth/login', credentials);
        return response.data;
    },

    register: async (userData: RegisterData) => {
        const response = await apiClient.post('/auth/register', userData);
        return response.data;
    },

    logout: async () => {
        const response = await apiClient.post('/auth/logout');
        return response.data;
    },
}