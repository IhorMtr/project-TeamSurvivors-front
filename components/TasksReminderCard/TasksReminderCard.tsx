'use client';
import { Task } from '@/types/types';
import css from './TasksReminderCard.module.css';
import { getTasks, updateTask } from '@/lib/api/tasks';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';
import AddTaskModal from '../AddTaskModal/AddTaskModal';
import { useState } from 'react';

interface UpdateTaskVariables {
  id: Task['_id'];
  payload: Partial<Task>;
}

const TasksReminderCard = () => {
  const router = useRouter();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

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
    setIsOpen(true);
  };

  const onCloseModal = () => {
    setIsOpen(false);
    queryClient.invalidateQueries({ queryKey: ['tasks'] });
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('uk-UA', {
      day: '2-digit',
      month: '2-digit',
    });
  };
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const weekAhead = new Date(today);
  weekAhead.setDate(today.getDate() + 7);

  const sortedTasks = data
    ? [...data].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      )
    : [];

  const todayTasks = sortedTasks.filter(task => {
    const taskDate = new Date(task.date);
    taskDate.setHours(0, 0, 0, 0);
    return taskDate.getTime() === today.getTime();
  });

  const weekTasks = sortedTasks.filter(task => {
    const taskDate = new Date(task.date);
    taskDate.setHours(0, 0, 0, 0);
    return taskDate > today && taskDate <= weekAhead;
  });

  const laterTasks = sortedTasks.filter(task => {
    const taskDate = new Date(task.date);
    taskDate.setHours(0, 0, 0, 0);
    return taskDate > weekAhead;
  });

  const isTasksEmpty =
    !isAuthenticated ||
    (isAuthenticated &&
      !todayTasks.length &&
      !weekTasks.length &&
      !laterTasks.length);

  return (
    <>
      <AddTaskModal isOpen={isOpen} onClose={onCloseModal} />
      <div className={css.tasksBlock}>
        <div className={css.tasksBlockHeader}>
          <h2>Важливі завдання</h2>
          <button className={css.addCircleBtn} onClick={onCreateTask}>
            <svg className={css.svg}>
              <use href="/icons.svg#icon-add_circle"></use>
            </svg>
          </button>
        </div>

        {isTasksEmpty && (
          <div>
            <div className={css.tasksBlockText}>
              <p className={css.tasksBlockTextBold}>
                Наразі немає жодних завдань
              </p>
              <p>Створіть мершій нове завдання!</p>
            </div>

            <div>
              <button
                className={css.buttonTasks}
                type="button"
                onClick={onCreateTask}
              >
                Створити завдання
              </button>
            </div>
          </div>
        )}

        {!!todayTasks.length && (
          <>
            <h3 className={css.groupTitle}>Сьогодні</h3>
            <ul>
              {todayTasks.map(task => (
                <li className={css.taskItem} key={task._id}>
                  <div className={css.taskDate}>{formatDate(task.date)}</div>
                  <div className={css.taskCheckboxBlock}>
                    <label>
                      <input
                        type="checkbox"
                        id={task._id}
                        checked={task.isDone}
                        onChange={onChangeStatusTask}
                      />
                      <svg className={css.taskCheckboxIcon} aria-hidden="true">
                        <use href="/icons.svg#icon-check-mark"></use>
                      </svg>
                      <span className={css.taskCheckboxBlockName}>
                        {task.name}
                      </span>
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}

        {!!weekTasks.length && (
          <>
            <h3 className={css.groupTitle}>Найближчий тиждень</h3>
            <ul>
              {weekTasks.map(task => (
                <li className={css.taskItem} key={task._id}>
                  <div className={css.taskDate}>{formatDate(task.date)}</div>
                  <div className={css.taskCheckboxBlock}>
                    <label>
                      <input
                        type="checkbox"
                        id={task._id}
                        checked={task.isDone}
                        onChange={onChangeStatusTask}
                      />
                      <svg className={css.taskCheckboxIcon} aria-hidden="true">
                        <use href="/icons.svg#icon-check-mark"></use>
                      </svg>
                      <span className={css.taskCheckboxBlockName}>
                        {task.name}
                      </span>
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}

        {!!laterTasks.length && (
          <>
            <h3 className={css.groupTitle}>Пізніше</h3>
            <ul>
              {laterTasks.map(task => (
                <li className={css.taskItem} key={task._id}>
                  <div className={css.taskDate}>{formatDate(task.date)}</div>
                  <div className={css.taskCheckboxBlock}>
                    <label>
                      <input
                        type="checkbox"
                        id={task._id}
                        checked={task.isDone}
                        onChange={onChangeStatusTask}
                      />
                      <svg className={css.taskCheckboxIcon} aria-hidden="true">
                        <use href="/icons.svg#icon-check-mark"></use>
                      </svg>
                      <span className={css.taskCheckboxBlockName}>
                        {task.name}
                      </span>
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
};

export default TasksReminderCard;
