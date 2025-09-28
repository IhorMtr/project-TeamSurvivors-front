'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { tasksApi, type CreateTaskData } from '@/services/tasksApi';

export const useTasks = () => {
  const queryClient = useQueryClient();

  const {
    data: tasks = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: tasksApi.getTasks,
    retry: 1,
  });

  const createMutation = useMutation({
    mutationFn: tasksApi.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ taskId, isDone }: { taskId: string; isDone: boolean }) =>
      tasksApi.updateTaskStatus(taskId, isDone),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const toggleTask = (taskId: string, currentStatus: boolean) => {
    updateStatusMutation.mutate({ taskId, isDone: !currentStatus });
  };

  const createTask = (taskData: CreateTaskData) => {
    createMutation.mutate(taskData);
  };

  return {
    tasks,
    isLoading,
    error,
    toggleTask,
    createTask,
    isCreating: createMutation.isPending,
    isUpdating: updateStatusMutation.isPending,
  };
};
