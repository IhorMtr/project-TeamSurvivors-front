'use client';

import { FC } from 'react';
import { getGoogleOAuthUrl } from '@/lib/api/auth';
import Image from 'next/image';
import css from './GoogleLoginButton.module.css';
import toast from 'react-hot-toast';

interface GoogleLoginButtonProps {
  className?: string;
  text?: string;
}

const GoogleLoginButton: FC<GoogleLoginButtonProps> = ({
  className = '',
  text = 'Увійти через Google',
}) => {
  const handleGoogleLogin = async () => {
    try {
      const url = await getGoogleOAuthUrl();
      window.location.href = url;
    } catch {
      toast.error('Помилка отримання Google OAuth URL. Спробуйте ще раз.');
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className={`${css.googleBtn} ${className}`}
    >
      <Image
        src="/google_logo.svg"
        alt="Google"
        width={18}
        height={18}
        className={css.icon}
      />
      <span className={css.text}>{text}</span>
    </button>
  );
};

export default GoogleLoginButton;
