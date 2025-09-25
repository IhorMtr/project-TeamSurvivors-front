'use client';
import React from 'react';
import css from './AuthForm.module.css';
import Image from 'next/image';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface AuthLayoutProps {
  children: React.ReactNode;
  sideImage?: string;
}

export default function AuthLayout({ children, sideImage }: AuthLayoutProps) {
  return (
    <div className={css.container}>
      <div className={css.formWrapper}>{children}</div>
      {sideImage && (
        <div className={css.imageWrapper}>
          <Image src={sideImage} alt="Side Illustration" />
        </div>
      )}
      <ToastContainer
        toastClassName="my-toast"
        position="top-left"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
