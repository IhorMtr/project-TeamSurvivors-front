import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import styles from './AddTaskForm.module.css';
import { Task } from '../../types/task';

interface AddTaskFormProps {
  taskToEdit: Task | null;
  onClose: () => void;
}

const createOrUpdateTask = async (taskData: Task): Promise<Task> => {
  const method = taskData.id ? 'PATCH' : 'POST';
  const url = taskData.id
    ? `${process.env.NEXT_PUBLIC_API_BASE}/api/tasks/${taskData.id}`
    : `${process.env.NEXT_PUBLIC_API_BASE}/api/tasks`;

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  });

  if (!response.ok) {
    throw new Error('Помилка при збереженні завдання');
  }

  return response.json();
};

const AddTaskForm: React.FC<AddTaskFormProps> = ({ taskToEdit, onClose }) => {
  const mutation = useMutation<Task, Error, Task>({
    mutationFn: createOrUpdateTask,
    onSuccess: () => {
      toast.success('Завдання успішно збережено!');
      onClose();
    },
    onError: error => {
      toast.error(error.message || 'Помилка при збереженні завдання');
    },
  });

  const validationSchema = Yup.object({
    title: Yup.string().required('Назва завдання обов’язкова'),
    date: Yup.date()
      .required('Дата обов’язкова')
      .typeError('Введіть коректну дату'),
  });

  const initialValues: Task = {
    title: taskToEdit?.title || '',
    date: taskToEdit?.date || new Date().toISOString().split('T')[0],
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={values => {
        mutation.mutate({ ...values, id: taskToEdit?.id });
      }}
    >
      {({ isSubmitting }) => (
        <Form className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="title">Завдання</label>
            <Field name="title" type="text" className={styles.input} />
            <ErrorMessage
              name="title"
              component="div"
              className={styles.error}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="date">Дата</label>
            <Field name="date" type="date" className={styles.input} />
            <ErrorMessage
              name="date"
              component="div"
              className={styles.error}
            />
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting || mutation.isPending}
          >
            {isSubmitting || mutation.isPending ? 'Збереження...' : 'Зберегти'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddTaskForm;
