import { Task } from '@/types/types';
import api from '../api';
import { cookies } from 'next/headers';

export const getServerTasks = async (): Promise<Task[]> => {
  const cookieStore = await cookies();
  const response = await api.get<{ data: Task[] }>('/api/tasks', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data.data;
};
