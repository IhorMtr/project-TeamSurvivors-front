import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import styles from './AddTaskForm.module.css';
import { Task } from '../../types/task';
import { createTask, updateTask } from '@/lib/api/clientApi';

interface AddTaskFormProps {
  taskToEdit: Task | null;
  onClose: () => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ taskToEdit, onClose }) => {
  const mutation = useMutation<Task, Error, Task>({
    mutationFn: task =>
      taskToEdit && taskToEdit.id
        ? updateTask(taskToEdit.id, { name: task.name, date: task.date })
        : createTask(task),
    onSuccess: () => {
      toast.success('Завдання успішно збережено!');
      onClose();
    },
    onError: error => {
      toast.error(error.message || 'Помилка при збереженні завдання');
    },
  });

  const validationSchema = Yup.object({
    name: Yup.string().required('Назва завдання обов’язкова'),
    date: Yup.date()
      .required('Дата обов’язкова')
      .typeError('Введіть коректну дату'),
  });

  const initialValues: Task = {
    name: taskToEdit?.name || '',
    date: taskToEdit?.date || new Date().toISOString().split('T')[0],
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={values => {
        mutation.mutate(values);
      }}
    >
      {({ isSubmitting }) => (
        <Form className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="name" className={styles.inputTitle}>
              Назва завдання
            </label>
            <Field id="name" name="name" type="text" className={styles.input} />
            <ErrorMessage
              name="name"
              component="div"
              className={styles.error}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="date" className={styles.inputTitle}>
              Дата
            </label>
            <Field id="date" name="date" type="date" className={styles.input} />
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
