'use client';

import { useState } from 'react';
import { useWeekData } from '@/hooks/useWeekData';
import { useTasks } from '@/hooks/useTasks';
import styles from './MomDevelopment.module.css';
import AddTaskModal from '../AddTaskModal/AddTaskModal';
import { PuffLoader } from 'react-spinners';

interface MomDevelopmentProps {
  weekNumber: number;
}

const getIconByCategory = (category: string) => {
  switch (category) {
    case 'Харчування':
      return '/fork_spoon.svg';
    case 'Гігієна':
    case 'Активність':
      return '/fitness_center.svg';
    case 'Самопочуття':
    case 'Відпочинок та комфорт':
      return '/chair.svg';
    default:
      return '/fork_spoon.svg';
  }
};

export default function MomDevelopment({ weekNumber }: MomDevelopmentProps) {
  const { momData, isLoading, error } = useWeekData(weekNumber);
  const { tasks, toggleTask, createTask } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className={styles.momDevelopment}>
        <div className={styles.loading}>
          <PuffLoader />
          <span>Завантаження даних...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.momDevelopment}>
        <div className={styles.error}>Помилка завантаження даних</div>
      </div>
    );
  }

  if (!momData) {
    return (
      <div className={styles.momDevelopment}>
        <div className={styles.error}>Дані не знайдено</div>
      </div>
    );
  }

 
  const handleAddTask = (taskName: string) => {
    createTask({
      name: taskName,
      date: new Date().toISOString().split('T')[0],
    });
  };
  

  return (
    <div className={styles.momDevelopment}>
      <div className={styles.frame}>
        <div className={styles.columnFeel}>
          <div className={styles.feelContainer}>
            <h2 className={styles.feelTitle}>Як ви можете почуватись</h2>
            
            <div className={styles.tagsContainer}>
              {momData.feelings.states.map((state, index) => (
                <div key={index} className={styles.tag}>
                  <span className={styles.tagText}>{state}</span>
                </div>
              ))}
            </div>
            
            <p className={styles.feelDescription}>
              {momData.feelings.sensationDescr}
            </p>
          </div>
        </div>

        <div className={styles.columnAdvice}>
          <div className={styles.adviceContainer}>
            <h2 className={styles.adviceTitle}>Поради для вашого комфорту</h2>
            
            {momData.comfortTips.map((tip, index) => (
              <div key={index} className={styles.adviceItem}>
                <div className={styles.adviceIcon}>
                  <img 
                    src={getIconByCategory(tip.category)} 
                    alt={tip.category}
                    width="24"
                    height="24"
                  />
                </div>
                <div className={styles.adviceContent}>
                  <h3 className={styles.adviceItemTitle}>{tip.category}</h3>
                  <p className={styles.adviceItemText}>{tip.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.taskBlock}>
        <div className={styles.taskContainer}>
          <div className={styles.taskHeader}>
            <h3 className={styles.taskTitle}>Важливі завдання</h3>
            <button 
              onClick={() => setIsModalOpen(true)}
              className={styles.addButton}
              title="Додати нове завдання"
            >
              <img src="/add_circle.svg" alt="Додати" width="24" height="24" />
            </button>
          </div>



          <ul className={styles.tasksList}>
            {tasks.map(task => (
              <li 
                key={task._id} 
                className={styles.taskItem}
                onClick={(e) => {
                  e.preventDefault(); 
                  e.stopPropagation(); 
                  toggleTask(task._id, task.isDone);
                }}
              >
                <div className={styles.taskDate}>
                  {new Date(task.date).toLocaleDateString('uk-UA', {
                    day: '2-digit',
                    month: '2-digit'
                  })}
                </div>
                <div className={styles.taskContent}>
                  <div className={`${styles.checkbox} ${task.isDone ? styles.checkboxChecked : ''}`}>
                    {task.isDone && (
                      <img src="/checbox.svg" alt="Виконано" width="14" height="12" />
                    )}
                  </div>
                  <span className={`${styles.taskText} ${task.isDone ? styles.taskTextCompleted : ''}`}>
                    {task.name}
                  </span>
                </div>
              </li>
            ))}
            
            {tasks.length === 0 && (
              <li className={styles.noTasks}>Немає завдань</li>
            )}
          </ul>


        </div>
      </div>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTask={handleAddTask}
      />
    </div>
  );
}