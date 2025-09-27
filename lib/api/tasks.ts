import { Task } from '@/types/task';
import { api } from './auth';

export const getTasks = async (): Promise<Task[]> => {
  const response = await api.get<{ data: Task[] }>('/tasks');
  return response.data.data;
};

export const updateTask = async (
  id: Task['_id'],
  payload: Partial<Task>
): Promise<Task> => {
  const response = await api.patch<Task>(`/tasks/${id}`, payload);
  return response.data;
};
