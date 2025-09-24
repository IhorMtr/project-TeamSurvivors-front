'use client';
import { Task } from '@/types/types';
import css from './TasksReminderCard.module.css';
import { getTasks, updateTask } from '@/lib/api/tasks';

import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

interface TasksReminderCardProps {
  tasks: Task[];
}

interface UpdateTaskVariables {
  id: Task['_id'];
  payload: Partial<Task>;
}

const TasksReminderCard = ({ tasks = [] }: TasksReminderCardProps) => {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => getTasks(),
    refetchOnMount: false,
  });

  const { mutateAsync } = useMutation<Task, Error, UpdateTaskVariables>({
    mutationFn: ({ id, payload }) => updateTask(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const onChangeStatusTask = async (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    const id = evt.target.id;
    const checkedStatus = evt.target.checked;
    mutateAsync({ id, payload: { isDone: checkedStatus } });
  };

  return (
    <div>
      <div>
        <h2>Важливі завдання</h2>
        {/* <button onClick={}> */}
        <svg className={css.svg} width={18} height={18}>
          <use href="/icons.svg#add_circle"></use>
        </svg>
        {/* </button> */}
      </div>
      {data?.length === 0 && (
        <div>
          <div>
            <span>Наразі немає жодних завдань</span>
            <span>Створіть мершій нове завдання!</span>
          </div>

          <div>
            <button type="button">Створити завдання</button>
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
