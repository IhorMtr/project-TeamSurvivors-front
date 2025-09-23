'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './ProfileEditForm.module.css';

interface ProfileData {
  name: string;
  email: string;
  childGender: 'male' | 'female' | '';
  deliveryDate: string;
}

interface ProfileEditFormProps {
  initialData: ProfileData;
  onSubmit: (data: ProfileData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  childGender: Yup.string()
    .oneOf(['male', 'female'], 'Please select child gender')
    .required('Child gender is required'),
  deliveryDate: Yup.date()
    .min(new Date(), 'Delivery date must be in the future')
    .required('Expected delivery date is required'),
});

export default function ProfileEditForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: ProfileEditFormProps) {
  return (
    <div className={styles.container}>
      <Formik
        initialValues={initialData}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ isSubmitting, dirty, resetForm, submitForm, values }) => (
          <>
            <Form className={styles.form}>
              <div className={styles.fieldGroup}>
                <label htmlFor="name" className={styles.label}>
                  Ім'я
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className={styles.input}
                  placeholder="Введіть ім'я"
                />
                <ErrorMessage name="name" component="div" className={styles.error} />
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="email" className={styles.label}>
                  Пошта
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className={styles.input}
                  placeholder="Введіть email"
                />
                <ErrorMessage name="email" component="div" className={styles.error} />
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="childGender" className={styles.label}>
                  Стать дитини
                </label>
                <Field as="select" id="childGender" name="childGender" className={styles.select}>
                  <option value="">Оберіть стать</option>
                  <option value="male">Хлопчик</option>
                  <option value="female">Дівчинка</option>
                </Field>
                <ErrorMessage name="childGender" component="div" className={styles.error} />
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="deliveryDate" className={styles.label}>
                  Планова дата пологів
                </label>
                <Field
                  type="date"
                  id="deliveryDate"
                  name="deliveryDate"
                  className={styles.input}
                />
                <ErrorMessage name="deliveryDate" component="div" className={styles.error} />
              </div>
            </Form>

            <div className={styles.buttonGroup}>
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  onCancel();
                }}
                className={styles.cancelButton}
                disabled={isSubmitting || isLoading}
              >
                Відмінити зміни
              </button>
              <button
                type="button"
                className={styles.saveButton}
                disabled={isSubmitting || isLoading || !dirty}
                onClick={submitForm}
              >
                {isSubmitting || isLoading ? 'Збереження...' : 'Зберігти зміни'}
              </button>
            </div>
          </>
        )}
      </Formik>
    </div>
  );
}