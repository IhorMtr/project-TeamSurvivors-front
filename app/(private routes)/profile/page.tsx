'use client';

import React, { useState, useRef, FormEvent, ChangeEvent } from 'react';
import Image from 'next/image';
import styles from './ProfilePage.module.css';
import {
  useCurrentUser,
  useUpdateUser,
  useUploadAvatar,
} from '@/lib/hooks/useUser';
import { User } from '@/lib/api/userApi';

export default function ProfilePage() {
  // React Query hooks
  const { data: userData, isLoading: isLoadingUser, error } = useCurrentUser();
  const updateUserMutation = useUpdateUser();
  const uploadAvatarMutation = useUploadAvatar();

  // Local state for form validation and UI
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Loading state - either fetching user or updating
  const isLoading =
    isLoadingUser ||
    updateUserMutation.isPending ||
    uploadAvatarMutation.isPending;


  // Handle avatar upload
  const handleAvatarChange = async (file: File): Promise<void> => {
    try {
      await uploadAvatarMutation.mutateAsync(file);
    } catch (error) {
      console.error('Error uploading avatar:', error);
    }
  };

  const handleUploadClick = (): void => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      handleAvatarChange(file);
    }
  };

  const validateForm = (data: User): Record<string, string> => {
    const newErrors: Record<string, string> = {};
    if (!data.name.trim()) newErrors.name = 'Name is required';
    if (data.name.length < 2)
      newErrors.name = 'Name must be at least 2 characters';

    if (!data.email.trim()) newErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(data.email))
      newErrors.email = 'Invalid email format';

    if (!data.gender) newErrors.gender = 'Please select child gender';
    if (!data.dueDate) newErrors.dueDate = 'Expected delivery date is required';


    return newErrors;
  };

  const handleInputChange = (field: keyof User) => (): void => {
    // We can't directly update userData since it's from React Query
    // Instead, we'll handle this in the form submission
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    if (!displayUserData) return;
    // Get form data
    const formData = new FormData(event.target as HTMLFormElement);
    const updatedData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      gender: formData.get('gender') as User['gender'],
      dueDate: formData.get('dueDate') as string,
    };
    const formErrors = validateForm({ ...displayUserData, ...updatedData });
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    try {
      await updateUserMutation.mutateAsync(updatedData);
      setErrors({});
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancel = (): void => {
    // Reset form and clear errors
    setErrors({});
    const form = document.querySelector('form') as HTMLFormElement;
    if (form) form.reset();
  };

  if (isLoadingUser) {
    return (
      <div className={styles.container}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '400px',
            fontSize: '16px',
            color: '#666',
          }}
        >
          Завантаження профілю...
        </div>
      </div>
    );
  }

  // Early return for error state
  if (error) {
    return (
      <div className={styles.container}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '400px',
            fontSize: '16px',
            color: '#e74c3c',
          }}
        >
          Помилка завантаження профілю. Спробуйте оновити сторінку.
        </div>
      </div>
    );
  }
  const displayUserData = userData || {
    _id: 'fallback-user',
    name: 'Ганна',
    email: 'hanna@gmail.com',
    photo: '',
    gender: '' as User['gender'],
    dueDate: '2025-07-16',
  };

  return (
    <section className={styles['profile-section']}>
      <div className={styles['profile-card']}>
        {/* Profile Header */}
        <div className={styles['profile-header']}>
          {displayUserData.photo ? (
            <Image
              src={displayUserData.photo}
              alt={displayUserData.name}
              className={styles['avatar-image']}
              width={132}
              height={132}
            />
          ) : (
            <div className={styles['avatar-placeholder']}>
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                className={styles['avatar-icon']}
              >
                <path
                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                  fill="currentColor"
                />
              </svg>
            </div>
          )}

          <div className={styles['profile-info']}>
            <h1 className={styles['profile-name']}>{displayUserData.name}</h1>
            <p className={styles['profile-email']}>{displayUserData.email}</p>
            <button
              type="button"
              onClick={handleUploadClick}
              className={styles['upload-btn']}
            >
              Завантажити нове фото
            </button>
          </div>
        </div>

        {/* Form Section */}
        <form className={styles['profile-form']} onSubmit={handleSubmit}>
          <ul className={styles['form-list']}>
            <li className={styles['form-item']}>
              <label htmlFor="name" className={styles['form-label']}>
                Ім&apos;я
              </label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={displayUserData.name}
                onChange={handleInputChange('name')}
                className={styles['form-input']}
                placeholder="Введіть ім'я"
              />
              {errors.name && <div className={styles.error}>{errors.name}</div>}
            </li>

            <li className={styles['form-item']}>
              <label htmlFor="email" className={styles['form-label']}>
                Пошта
              </label>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue={displayUserData.email}
                onChange={handleInputChange('email')}
                className={styles['form-input']}
                placeholder="Введіть email"
              />
              {errors.email && (
                <div className={styles.error}>{errors.email}</div>
              )}
            </li>
          </ul>

          <div className={styles['child-info-container']}>
            <ul className={styles['child-info-list']}>
              <li className={styles['form-item']}>
                <label htmlFor="status" className={styles['form-label']}>
                  Стать дитини
                </label>
                <select
                  id="status"
                  name="gender"
                  defaultValue={displayUserData.gender}
                  onChange={handleInputChange('gender')}
                  className={styles['form-select']}
                >
                  <option value="">Оберіть стать</option>
                  <option value="boy">Хлопчик</option>
                  <option value="girl">Дівчинка</option>
                </select>
                {errors.gender && (
                  <div className={styles.error}>{errors.gender}</div>
                )}
              </li>

              <li className={styles['form-item']}>
                <label htmlFor="birthdate" className={styles['form-label']}>
                  Планова дата пологів
                </label>
                <input
                  type="date"
                  id="birthdate"
                  name="dueDate"
                  defaultValue={displayUserData.dueDate}
                  onChange={handleInputChange('dueDate')}
                  className={styles['form-input']}
                />
                {errors.dueDate && (
                  <div className={styles.error}>{errors.dueDate}</div>
                )}
              </li>
            </ul>
          </div>

          <div className={styles['form-actions']}>
            <button
              type="button"
              onClick={handleCancel}
              className={`${styles.btn} ${styles['btn-secondary']}`}
              disabled={isLoading}
            >
              Відмінити зміни
            </button>
            <button
              type="submit"
              className={`${styles.btn} ${styles['btn-primary']}`}
              disabled={isLoading}
            >
              {isLoading ? 'Збереження...' : 'Зберегти зміни'}
            </button>
          </div>
        </form>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className={styles['hidden-input']}
        />
      </div>
    </section>
  );
}
