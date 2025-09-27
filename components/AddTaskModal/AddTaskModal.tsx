import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import AddTaskForm from '../AddTaskForm/AddTaskForm';
import styles from './AddTaskModal.module.css';
import { Task } from '../../types/task';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskToEdit?: Task | null;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({
  isOpen,
  onClose,
  taskToEdit,
}) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Закрити"
        >
          <svg
            className={styles.closeIcon}
            aria-hidden="true"
            focusable="false"
          >
            <use href="/icons.svg#icon-close" />
          </svg>
        </button>
        <h2 className={styles.modalTitle}>
          {taskToEdit ? 'Редагувати завдання' : `Нове завдання`}
        </h2>
        <AddTaskForm taskToEdit={taskToEdit ?? null} onClose={onClose} />{' '}
      </div>
    </div>,
    document.body
  );
};

export default AddTaskModal;
