'use client';

import { FC } from "react";
import { getGoogleOAuthUrl } from "@/lib/api/auth";
import Image from "next/image";
import css from './GoogleLoginButton.module.css';

interface GoogleLoginButtonProps {
  className?: string;      // додаткові класи зовні
  text?: string;           // текст кнопки
}

const GoogleLoginButton: FC<GoogleLoginButtonProps> = ({ className = '', text = "Увійти через Google" }) => {
  const handleGoogleLogin = async () => {
    try {
      const url = await getGoogleOAuthUrl();
      window.location.href = url;
    } catch (err) {
      console.error("Помилка отримання Google OAuth URL:", err);
    }
  };

  return (
    <button 
      type="button"
      onClick={handleGoogleLogin} 
      className={`${css.googleBtn} ${className}`}
    >
      <Image
        src="/google_logo.svg"  // без /public
        alt="Google"
        width={24}
        height={24}
        className={css.icon}
      />
      <span className={css.text}>{text}</span>
    </button>
  );
};

export default GoogleLoginButton;
