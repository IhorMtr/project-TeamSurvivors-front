'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import styles from '../../../modules/OnboardingForm.module.css';
import { onboardingValidationSchema } from '@/lib/schemas/onboarding';

export default function EditProfilePage() {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const router = useRouter();

  return (
    <div className={styles.layout}>
      {/* Левая колонка: карточка */}
      <div className={styles.left}>
        <div className={styles.card}>
          <div className={styles.heading}>
            Давайте
            <br />
            познайомимось
            <br />
            ближче
          </div>
          <Formik
            initialValues={{ gender: '', dueDate: '', avatar: null }}
            validationSchema={onboardingValidationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              const formData = new FormData();
              if (values.avatar) formData.append('avatar', values.avatar);
              formData.append('gender', values.gender);
              formData.append('dueDate', values.dueDate);

              try {
                await axios.post('/api/onboarding', formData, {
                  headers: { 'Content-Type': 'multipart/form-data' },
                });
                router.push('/my-day');
              } catch (error) {
                alert('Помилка: ' + (error as any).message);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ setFieldValue, isValid, isSubmitting }) => (
              <Form>
                {/* Фото */}
                <div className={styles.avatarWrapper}>
                  <div className={styles.avatarCircle}>
                    {avatarPreview ? (
                      <img
                        src={avatarPreview}
                        alt="avatar"
                        className={styles.avatarImg}
                      />
                    ) : (
                      <svg width="48" height="48" fill="none">
                        <rect width="48" height="48" rx="24" fill="#E5E7EB" />
                        <path
                          d="M24 28c-2.5 0-7 1.27-7 3.8V33h14v-1.2C31 29.27 26.5 28 24 28ZM24 25c1.96 0 3.55-1.59 3.55-3.55 0-1.96-1.59-3.55-3.55-3.55-1.96 0-3.55 1.59-3.55 3.55 0 1.96 1.59 3.55 3.55 3.55Z"
                          fill="#BDBDBD"
                        />
                      </svg>
                    )}
                  </div>
                  <label className={styles.uploadLabel}>
                    Завантажити фото
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={e => {
                        const file = e.target.files?.[0] || null;
                        setFieldValue('avatar', file);
                        setAvatarPreview(
                          file ? URL.createObjectURL(file) : null
                        );
                      }}
                    />
                  </label>
                  <ErrorMessage
                    name="avatar"
                    component="div"
                    className={styles.error}
                  />
                </div>

                {/* Стать дитини */}
                <span className={styles.label}>Стать дитини</span>
                <Field as="select" name="gender" className={styles.select}>
                  <option value="">Оберіть стать</option>
                  <option value="boy">Хлопчик</option>
                  <option value="girl">Дівчинка</option>
                  <option value="unknown">Ще не знаю</option>
                </Field>
                <ErrorMessage
                  name="gender"
                  component="div"
                  className={styles.error}
                />

                {/* Дата пологів */}
                <span className={styles.label}>Планова дата пологів</span>
                <Field
                  type="date"
                  name="dueDate"
                  className={styles.input}
                  placeholder="ДД.ММ.РРРР"
                />
                <ErrorMessage
                  name="dueDate"
                  component="div"
                  className={styles.error}
                />

                <button
                  type="submit"
                  className={styles.button}
                  disabled={!isValid || isSubmitting}
                >
                  Зберегти
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      {/* Правая колонка: картинка паростка */}
      <div className={styles.right}>
        <img src="/images/plant.png" alt="plant" className={styles.image} />
      </div>
    </div>
  );
}
