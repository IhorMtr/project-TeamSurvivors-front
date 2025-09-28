import { api } from '@/lib/api/auth';

export interface Task {
  _id: string;
  name: string;
  date: string;
  isDone: boolean;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskData {
  name: string;
  date: string;
  isDone?: boolean;
}

export const tasksApi = {
  getTasks: async (): Promise<Task[]> => {
    const response = await api.get('/tasks');
    return response.data.data;
  },

  createTask: async (taskData: CreateTaskData): Promise<Task> => {
    const response = await api.post('/tasks', taskData);
    return response.data.data;
  },

  updateTaskStatus: async (taskId: string, isDone: boolean): Promise<Task> => {
    const response = await api.patch(`/tasks/${taskId}`, { isDone });
    return response.data.data;
  },
};
