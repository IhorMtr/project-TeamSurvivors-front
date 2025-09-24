'use client';

import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import styles from './AddTaskModal.module.css';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (taskName: string) => void;
}

export default function AddTaskModal({ isOpen, onClose, onAddTask }: AddTaskModalProps) {
  const [taskName, setTaskName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskName.trim()) {
      onAddTask(taskName.trim());
      setTaskName('');
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} ariaLabel="Додати нове завдання">
      <h2 className={styles.title}>Нове завдання</h2>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="taskName" className={styles.label}>
            Назва завдання
          </label>
          <input
            id="taskName"
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Введіть назву завдання..."
            className={styles.input}
            autoFocus
          />
        </div>
        
        <div className={styles.buttons}>
          <button type="button" onClick={onClose} className={styles.cancelButton}>
            Скасувати
          </button>
          <button type="submit" className={styles.submitButton} disabled={!taskName.trim()}>
            Додати
          </button>
        </div>
      </form>
    </Modal>
  );
}