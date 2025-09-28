'use client';

import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldProps } from 'formik';
import { PuffLoader } from 'react-spinners';
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
  const [isGenderOpen, setGenderOpen] = useState(false);

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
                  placeholder="Введіть ім'я"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className={styles.error}
                />
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
                <ErrorMessage
                  name="email"
                  component="div"
                  className={styles.error}
                />
              </div>

              {/* Modified Gender Field */}
              <div className={styles.fieldGroup}>
                <label htmlFor="gender" className={styles.label}>
                  Стать дитини
                </label>
                <div
                  className={`${styles.inputWrapper} ${
                    isGenderOpen ? styles.open : ''
                  }`}
                >
                  <div className={styles.selectWrapper}>
                    <Field name="gender">
                      {({ field }: FieldProps) => (
                        <select
                          {...field}
                          id="gender"
                          className={styles.select}
                          onMouseDown={() => setGenderOpen(prev => !prev)}
                          onBlur={() => setGenderOpen(false)}
                          onChange={e => {
                            field.onChange(e);
                            setGenderOpen(false);
                          }}
                        >
                          <option value="" disabled hidden>
                            Оберіть стать
                          </option>
                          <option value="boy">Хлопчик</option>
                          <option value="girl">Дівчинка</option>
                          <option value="unknown">Ще не знаю</option>
                        </select>
                      )}
                    </Field>
                    <svg className={styles.selectChevron}>
                      <use href="/icons.svg#icon-chevron_down" />
                    </svg>
                  </div>
                </div>
                <ErrorMessage
                  name="gender"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="dueDate" className={styles.label}>
                  Планова дата пологів
                </label>
                <Field
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  className={styles.input}
                />
                <ErrorMessage
                  name="dueDate"
                  component="div"
                  className={styles.error}
                />
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
                {formSubmitting || isSubmitting ? (
                  <PuffLoader />
                ) : (
                  'Зберегти зміни'
                )}
              </button>
            </div>
          </>
        )}
      </Formik>
    </div>
  );
}
