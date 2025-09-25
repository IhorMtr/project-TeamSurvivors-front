'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { profileSchema, ProfileFormData } from '@/utils/schemas/profile';
import styles from './ProfileEditForm.module.css';

interface ProfileEditFormProps {
  initialValues: ProfileFormData;
  onSubmit: (data: ProfileFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export default function ProfileEditForm({
  initialValues,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: ProfileEditFormProps) {
  return (
    <div className={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={profileSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ dirty, resetForm, submitForm, isSubmitting: formSubmitting }) => (
          <>
            <Form className={styles.form}>
              <div className={styles.fieldGroup}>
                <label htmlFor="name" className={styles.label}>
                  Ім&apos;я
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className={styles.input}
                  placeholder="Введіть ім&apos;я"
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
                disabled={formSubmitting || isSubmitting}
              >
                Відмінити зміни
              </button>
              <button
                type="button"
                className={styles.saveButton}
                disabled={formSubmitting || isSubmitting || !dirty}
                onClick={submitForm}
              >
                {formSubmitting || isSubmitting ? 'Збереження...' : 'Зберегти зміни'}
              </button>
            </div>
          </>
        )}
      </Formik>
    </div>
  );
}