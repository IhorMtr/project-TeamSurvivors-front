'use client';

import { useState, useEffect } from 'react';
import { authApi } from '@/services/authApi';

interface ErrorResponse {
  message: string;
}

interface ApiError extends Error {
  response?: {
    data?: ErrorResponse;
    status?: number;
  };
}

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      setIsAuthenticated(!!token);
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await authApi.login({ email, password });
      
      if (response.data?.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
        setIsAuthenticated(true);
        return { success: true };
      }
      return { success: false };
    } catch (err: unknown) {
      const error = err as ApiError;
      setError(error.response?.data?.message || error.message || 'Помилка авторизації');
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await authApi.register({ name, email, password });
      return { success: true };
    } catch (err: unknown) {
      const error = err as ApiError;
      setError(error.response?.data?.message || error.message || 'Помилка реєстрації');
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (err: unknown) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('accessToken');
      setIsAuthenticated(false);
      window.location.href = '/auth/login';
    }
  };

  return {
    login,
    register,
    logout,
    isAuthenticated,
    isLoading,
    error,
  };
};