'use client';

import React, { useEffect } from 'react';
import styles from './ProfilePage.module.css';
import {
  useCurrentUser,
  useUpdateUser,
  useUploadAvatar,
} from '@/lib/hooks/useUser';
import { ProfileAvatar } from '@/components/ProfileAvatar/ProfileAvatar';
import ProfileEditForm from '@/components/ProfileEditForm/ProfileEditForm';
import { ProfileFormData } from '@/utils/schemas/profile';
import PuffLoader from 'react-spinners/PuffLoader';
import { toast } from 'react-hot-toast';

export default function ProfilePage() {
  const { data: userData, isLoading: isLoadingUser, error } = useCurrentUser();
  const updateUserMutation = useUpdateUser();
  const uploadAvatarMutation = useUploadAvatar();

  useEffect(() => {
    if (error) {
      toast.error('Помилка завантаження профілю. Спробуйте ще раз.');
    }
  }, [error]);

  if (isLoadingUser) {
    return (
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <PuffLoader />
      </div>
    );
  }

  if (error || !userData) {
    return null;
  }

  const initialValues: ProfileFormData = {
    name: userData.name,
    email: userData.email,
    gender: userData.gender || '',
    dueDate: userData.dueDate || '',
  };

  return (
    <section className={styles['profile-section']}>
      <div className={styles.container}>
        <div className={styles['profile-card']}>
          <ProfileAvatar
            user={userData}
            isUploading={uploadAvatarMutation.isPending}
            onAvatarChange={file => uploadAvatarMutation.mutate(file)}
          />
          <ProfileEditForm
            initialValues={initialValues}
            isSubmitting={updateUserMutation.isPending}
            onSubmit={(values: ProfileFormData) =>
              updateUserMutation.mutate(values)
            }
            onCancel={() => updateUserMutation.reset()}
          />
        </div>
      </div>
    </section>
  );
}
