import { Task } from '@/types/types';
import api from '../api';

export const getTasks = async (): Promise<Task[]> => {
  const response = await api.get<{ data: Task[] }>('/api/tasks');
  return response.data.data;
};

export const updateTask = async (
  id: Task['_id'],
  payload: Partial<Task>
): Promise<Task> => {
  const response = await api.patch<Task>(`/api/tasks/${id}`, payload);
  return response.data;
};
