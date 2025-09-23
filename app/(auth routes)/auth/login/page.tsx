'use client';

import { useId } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { loginUser } from '../../../../lib/api/auth';
import * as Yup from 'yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import css from '../AuthForm.module.css';
import Image from 'next/image';

const LoginFormSchema = Yup.object().shape({
  email: Yup.string()
    .max(64, 'Email занадто довгий')
    .email('Невірний формат email')
    .required('Email обов’язковий'),
  password: Yup.string()
    .min(8, 'Пароль мінімум 8 символів')
    .max(128, 'Пароль занадто довгий')
    .required('Пароль обов’язковий'),
});

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginForm() {
  const fieldId = useId();
  const router = useRouter();

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      const res = await loginUser(values);
      console.log('data', res.data);
      // router.push('/myday');
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      alert(
        error.response?.data?.message || 'Невірно вказаний логін чи пароль'
      );
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={LoginFormSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <div className={css.authContainer}>
          <div className={css.logoWrapper}>
            <Image
              src="/logo.png"
              alt="Leleka Logo"
              width={95}
              height={29}
              className={css.logo}
            />
          </div>
          <div className={css.formWrapper}>
            <Form className={css.form}>
              <fieldset className={css.fieldset}>
                <legend className={css.legend}>Вхід</legend>

                {/* Email */}
                <label
                  className={css.label}
                  htmlFor={`${fieldId}-email`}
                ></label>
                <Field
                  className={`${css.input} ${errors.email && touched.email ? css.inputError : ''}`}
                  type="email"
                  name="email"
                  id={`${fieldId}-email`}
                  placeholder="Пошта"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={css.error}
                />

                {/* Пароль */}
                <label
                  className={css.label}
                  htmlFor={`${fieldId}-password`}
                ></label>
                <Field
                  className={`${css.input} ${errors.password && touched.password ? css.inputError : ''}`}
                  type="password"
                  name="password"
                  id={`${fieldId}-password`}
                  placeholder="Пароль"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className={css.error}
                />
              </fieldset>

              <button
                type="submit"
                disabled={isSubmitting}
                className={css.button}
              >
                {isSubmitting ? 'Завантаження...' : 'Увійти'}
              </button>

              <p className={css.registerLink}>
                Немає аккаунту?{' '}
                <Link href="/auth/register" className={css.link}>
                  Зареєструватися
                </Link>
              </p>
            </Form>
          </div>

          {/* Бічний малюнок для десктопу */}
          <div className={css.sideImageWrapper}>
            <Image
              src="/nest-login.png"
              alt="Login Illustration"
              width={720}
              height={900}
              // fill
              // style={{ objectFit: "contain" }}
              priority
            />
          </div>
        </div>
      )}
    </Formik>
  );
}
