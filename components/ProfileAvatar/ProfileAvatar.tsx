import React, { useRef } from 'react';
import Image from 'next/image';
import { PuffLoader } from 'react-spinners';
import styles from './ProfileAvatar.module.css';
import { User } from '@/types/user';

interface ProfileAvatarProps {
  user: User;
  isUploading: boolean;
  onAvatarChange: (file: File) => void;
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ user, isUploading, onAvatarChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onAvatarChange(e.target.files[0]);
    }
  };

  return (
    <div className={styles.avatarBlock}>
      <div className={styles.avatarImageWrap}>
        {user.avatar ? (
          <Image src={user.avatar} alt={user.name} width={132} height={132} className={styles.avatarImage} />
        ) : (
          <div className={styles.avatarPlaceholder} />
        )}
      </div>
      <div className={styles.userInfo}>
        <div className={styles.userName}>{user.name}</div>
        <div className={styles.userEmail}>{user.email}</div>
        <label className={styles.uploadButton}>
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleFileChange}
            disabled={isUploading}
          />
          {isUploading ? <PuffLoader size={20} color="#fff" /> : 'Завантажити нове фото'}
        </label>
      </div>
    </div>
  );
}
