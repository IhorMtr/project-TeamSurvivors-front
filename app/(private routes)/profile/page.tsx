'use client';

import React from 'react';
import styles from './ProfilePage.module.css';
import { useCurrentUser, useUpdateUser, useUploadAvatar } from '@/lib/hooks/useUser';
import { ProfileAvatar } from '@/components/ProfileAvatar/ProfileAvatar';
import ProfileEditForm from '@/components/ProfileEditForm/ProfileEditForm';
import { ProfileFormData } from '@/utils/schemas/profile';


export default function ProfilePage() {
  const { data: userData, isLoading: isLoadingUser, error } = useCurrentUser();
  const updateUserMutation = useUpdateUser();
  const uploadAvatarMutation = useUploadAvatar();

  if (isLoadingUser) {
    return (
      <div className={styles.container}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
          <span>Завантаження...</span>
        </div>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className={styles.container}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px', fontSize: '16px', color: '#e74c3c' }}>
          Помилка завантаження профілю. Спробуйте оновити сторінку.
        </div>
      </div>
    );
  }

  const initialValues: ProfileFormData = {
    name: userData.name,
    email: userData.email,
    gender: userData.gender || '',
    dueDate: userData.dueDate || '',
  };

  return (
    <section className={styles['profile-section']}>
      <div className={styles['profile-card']}>
        <ProfileAvatar
          user={userData}
          isUploading={uploadAvatarMutation.isPending}
          onAvatarChange={file => uploadAvatarMutation.mutate(file)}
        />
        <ProfileEditForm
          initialValues={initialValues}
          isSubmitting={updateUserMutation.isPending}
          onSubmit={(values: ProfileFormData) => updateUserMutation.mutate(values)}
          onCancel={() => updateUserMutation.reset()}
        />
      </div>
    </section>
  );
}
