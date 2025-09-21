'use client';
import React from "react";
import css from './AuthForm.module.css';

interface AuthLayoutProps {
  children: React.ReactNode;
  sideImage?: string; 
}

export default function AuthLayout({ children, sideImage }: AuthLayoutProps) {
  return (
    <div className={css.container}>
      <div className={css.formWrapper}>
        {children} 
      </div>
      {sideImage && (
        <div className={css.imageWrapper}>
          <img src={sideImage} alt="Side Illustration" />
        </div>
      )}
    </div>
  );
}
