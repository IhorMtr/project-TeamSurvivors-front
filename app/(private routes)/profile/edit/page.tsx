'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field } from 'formik';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import styles from './OnboardingForm.module.css';
import { useUpdateUser, useUploadAvatar } from '@/lib/hooks/useUser';
import { updateOnboarding } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

type FormValues = {
  gender: string;
  dueDate: string;
  avatar: File | null;
};

function getErrorMessage(err: unknown, fallback: string) {
  const error = err as AxiosError<{ message?: string }>;
  if (error.response) {
    const status = error.response.status;
    switch (status) {
      case 400:
        return error.response.data?.message || 'Некоректні дані у формі.';
      case 401:
        return 'Сесію завершено. Увійдіть ще раз.';
      case 500:
        return 'Помилка сервера. Спробуйте пізніше.';
      default:
        return error.response.data?.message || fallback;
    }
  } else if (error.request) {
    return 'Немає з’єднання з сервером. Перевірте інтернет.';
  }
  return fallback;
}

export default function EditProfilePage() {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();

  const updateUserMutation = useUpdateUser();
  const uploadAvatarMutation = useUploadAvatar();

  useEffect(() => {
    if (!isAuthenticated) return;
    const isOnboardingDone = Boolean(user.gender || user.photo || user.dueDate);
    if (isOnboardingDone) {
      router.replace('/');
    }
  }, [isAuthenticated, user, router]);

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

          <Formik<FormValues>
            initialValues={{ gender: '', dueDate: '', avatar: null }}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                if (!values.dueDate) {
                  toast.error('Поле "Планова дата пологів" є обовʼязковим');
                  setSubmitting(false);
                  return;
                }

                const selectedDate = new Date(values.dueDate);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const maxDate = new Date(today);
                maxDate.setDate(today.getDate() + 294);

                if (selectedDate < today) {
                  toast.error('Дата не може бути раніше сьогоднішньої');
                  setSubmitting(false);
                  return;
                }
                if (selectedDate > maxDate) {
                  toast.error('Дата не може бути пізніше ніж через 42 тижні');
                  setSubmitting(false);
                  return;
                }

                if (values.avatar) {
                  try {
                    await uploadAvatarMutation.mutateAsync(values.avatar);
                  } catch (e) {
                    toast.error(
                      getErrorMessage(e, 'Не вдалося завантажити фото')
                    );
                    setSubmitting(false);
                    return;
                  }
                }

                try {
                  await updateOnboarding({
                    gender: values.gender
                      ? (values.gender as 'boy' | 'girl' | 'unknown')
                      : null,
                    dueDate: values.dueDate,
                  });
                } catch (e) {
                  toast.error(getErrorMessage(e, 'Не вдалося зберегти анкету'));
                  setSubmitting(false);
                  return;
                }

                router.push('/');
              } catch (e) {
                toast.error(
                  getErrorMessage(e, 'Сталася помилка, спробуйте ще раз')
                );
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ setFieldValue, isSubmitting }) => {
              const isBusy =
                isSubmitting ||
                updateUserMutation.isPending ||
                uploadAvatarMutation.isPending;

              return (
                <Form>
                  <div className={styles.avatarWrapper}>
                    <div className={styles.avatarCircle}>
                      {avatarPreview ? (
                        <Image
                          src={avatarPreview}
                          alt="avatar"
                          className={styles.avatarImg}
                          width={164}
                          height={164}
                        />
                      ) : (
                        <Image
                          src="/preview_photo_onboarding.png"
                          alt="preview photo"
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
                  </div>

                  <div
                    className={`${styles.inputWrapper} ${open ? styles.open : ''}`}
                  >
                    <span className={styles.label}>Стать дитини</span>
                    <div className={styles.selectWrapper}>
                      <Field
                        as="select"
                        name="gender"
                        className={`${styles.select} ${styles.formInput}`}
                        onFocus={() => setOpen(true)}
                        onBlur={() => setOpen(false)}
                      >
                        <option value="">Оберіть стать</option>
                        <option value="boy">Хлопчик</option>
                        <option value="girl">Дівчинка</option>
                        <option value="unknown">Ще не знаю</option>
                      </Field>
                      <svg className={styles.selectChevron}>
                        <use href="/icons.svg#icon-chevron_down" />
                      </svg>
                    </div>
                  </div>

                  <div className={styles.inputWrapper}>
                    <span className={styles.label}>Планова дата пологів</span>
                    <Field
                      type="date"
                      name="dueDate"
                      className={`${styles.dateInput} ${styles.formInput}`}
                      placeholder="ДД.ММ.РРРР"
                    />
                  </div>

                  <button
                    type="submit"
                    className={styles.button}
                    disabled={isBusy}
                  >
                    Зберегти
                  </button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>

      <div className={styles.imageWrapper}>
        <Image
          src="/images/plant.png"
          alt="plant"
          priority
          className={styles.image}
          fill
          sizes="(max-width: 1439px) 0px, 50vw"
        />
      </div>
    </div>
  );
}
