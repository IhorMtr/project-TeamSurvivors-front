import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import styles from './AddTaskForm.module.css';
import { Task } from '../../types/task';
import { api, ApiResponse } from '@/lib/api/auth';

interface AddTaskFormProps {
  taskToEdit: Task | null;
  onClose: () => void;
}

const createOrUpdateTask = async (taskData: Task): Promise<Task> => {
  const url = taskData._id ? `/tasks/${taskData._id}` : `/tasks`;

  const response = await api.post<ApiResponse<Task>>(url, taskData);

  if (response.status !== 201) {
    throw new Error('Помилка при збереженні завдання');
  }
  return response.data.data;
};

const AddTaskForm: React.FC<AddTaskFormProps> = ({ taskToEdit, onClose }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<Task, Error, Task>({
    mutationFn: createOrUpdateTask,
    onSuccess: () => {
      toast.success('Завдання успішно збережено!');
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
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

  const initialValues: Pick<Task, 'name' | 'date' | 'isDone'> = {
    name: taskToEdit?.name || '',
    date: taskToEdit?.date || new Date().toISOString().split('T')[0],
    isDone: taskToEdit?.isDone || false,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={values => {
        mutation.mutate({ ...values, _id: taskToEdit?._id });
      }}
    >
      {({ isSubmitting }) => (
        <Form className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="title">Завдання</label>
            <Field name="name" type="text" className={styles.input} />
            <ErrorMessage
              name="name"
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
