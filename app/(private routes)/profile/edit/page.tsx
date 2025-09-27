'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Image from 'next/image';
import toast from 'react-hot-toast';

import styles from './OnboardingForm.module.css';
import { onboardingValidationSchema } from '@/lib/schemas/onboarding';
import { useUpdateUser, useUploadAvatar } from '@/lib/hooks/useUser';
import { updateOnboarding } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

type FormValues = {
  gender: string;
  dueDate: string;
  avatar: File | null;
};

export default function EditProfilePage() {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();

  const updateUserMutation = useUpdateUser();
  const uploadAvatarMutation = useUploadAvatar();

  useEffect(() => {
    if (!isAuthenticated) return;

    const isOnboardingDone = Boolean(user.gender && user.photo && user.dueDate);

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
            validationSchema={onboardingValidationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                if (values.avatar) {
                  await uploadAvatarMutation.mutateAsync(values.avatar);
                }

                await updateOnboarding({
                  gender: values.gender as 'boy' | 'girl' | 'unknown' | null,
                  dueDate: values.dueDate || null,
                });

                router.push('/my-day');
              } catch {
                toast.error('Сталася помилка, спробуйте ще раз');
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ setFieldValue, isValid, isSubmitting }) => {
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

                    <ErrorMessage
                      name="avatar"
                      component="div"
                      className={styles.error}
                    />
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
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className={styles.error}
                  />

                  <div className={styles.inputWrapper}>
                    <span className={styles.label}>Планова дата пологів</span>
                    <Field
                      type="date"
                      name="dueDate"
                      className={`${styles.dateInput} ${styles.formInput}`}
                      placeholder="ДД.ММ.РРРР"
                    />
                    <ErrorMessage
                      name="dueDate"
                      component="div"
                      className={styles.error}
                    />
                  </div>

                  <button
                    type="submit"
                    className={styles.button}
                    disabled={!isValid || isBusy}
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
