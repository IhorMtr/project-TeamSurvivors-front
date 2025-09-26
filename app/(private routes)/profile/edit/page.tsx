'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import styles from './OnboardingForm.module.css';
import { onboardingValidationSchema } from '@/lib/schemas/onboarding';
import Image from 'next/image';
import toast from 'react-hot-toast';

export default function EditProfilePage() {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const router = useRouter();

  return (
    <div className={styles.layout}>
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
              } catch {
                toast.error('Сталася помилка, спробуйте ще раз');
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ setFieldValue, isValid, isSubmitting }) => (
              <Form>
                <div className={styles.avatarWrapper}>
                  <div className={styles.avatarCircle}>
                    {avatarPreview ? (
                      <Image
                        src={avatarPreview}
                        alt="avatar"
                        className={styles.avatarImg}
                      />
                    ) : (
                      <Image
                        src={'/preview_photo_onboarding.png'}
                        alt={'preview photo'}
                        width={164}
                        height={164}
                      />
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
                <div className={styles.selectWrapper}>
                  <span className={styles.label}>Стать дитини</span>
                  <Field as="select" name="gender" className={styles.select}>
                    <option value="">Оберіть стать</option>
                    <option value="boy">Хлопчик</option>
                    <option value="girl">Дівчинка</option>
                    <option value="unknown">Ще не знаю</option>
                  </Field>
                  <svg className={styles.selectChevron}>
                    <use href="/icons.svg#icon-chevron_down" />
                  </svg>
                </div>
                <ErrorMessage
                  name="gender"
                  component="div"
                  className={styles.error}
                />
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
      <div className={styles.right}>
        <Image
          src="/images/plant.png"
          alt="plant"
          className={styles.image}
          fill
        />
      </div>
    </div>
  );
}
