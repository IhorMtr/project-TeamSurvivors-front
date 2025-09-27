'use client';
import { Task } from '@/types/types';
import css from './TasksReminderCard.module.css';
import { getTasks, updateTask } from '@/lib/api/tasks';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';

interface UpdateTaskVariables {
  id: Task['_id'];
  payload: Partial<Task>;
}

const TasksReminderCard = () => {
  const router = useRouter();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => getTasks(),
    refetchOnMount: false,
    enabled: isAuthenticated,
  });

  const { mutate } = useMutation<Task, Error, UpdateTaskVariables>({
    mutationFn: ({ id, payload }) => updateTask(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const onChangeStatusTask = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const id = evt.target.id;
    const checkedStatus = evt.target.checked;
    mutate({ id, payload: { isDone: checkedStatus } });
  };

  const onCreateTask = () => {
    if (!isAuthenticated) router.push('/auth/login');

    // TODO: open dialog to create task
  };

  const isTasksEmpty =
    !isAuthenticated || (isAuthenticated && data?.length === 0);

  return (
    <div>
      <div>
        <h2>Важливі завдання</h2>
        <button onClick={onCreateTask}>
          <svg className={css.svg} width={18} height={18}>
            <use href="/icons.svg#icon-add_circle"></use>
          </svg>
        </button>
      </div>
      {isTasksEmpty && (
        <div>
          <div>
            <span>Наразі немає жодних завдань</span>
            <span>Створіть мершій нове завдання!</span>
          </div>

          <div>
            <button type="button" onClick={onCreateTask}>
              Створити завдання
            </button>
          </div>
        </div>
      )}
      {!!data?.length && (
        <ul>
          {data?.map(task => (
            <li key={task._id}>
              <div>{task.date}</div>

              <input
                type="checkbox"
                name={`task-${task._id}`}
                id={task._id}
                checked={task.isDone}
                onChange={onChangeStatusTask}
              />
              <span>{task.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TasksReminderCard;
