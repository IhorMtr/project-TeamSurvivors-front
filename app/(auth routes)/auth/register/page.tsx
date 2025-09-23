'use client';

import { registerUser } from '../../../../lib/api/auth';
import { useId, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import css from '../AuthForm.module.css';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const RegistrationFormSchema = Yup.object().shape({
  name: Yup.string().max(32, 'Ім’я занадто довге').required('Ім’я обов’язкове'),
  email: Yup.string()
    .max(64, 'Email занадто довгий')
    .email('Невірний формат email')
    .required('Email обов’язковий'),
  password: Yup.string()
    .min(8, 'Пароль мінімум 8 символів')
    .max(128, 'Пароль занадто довгий')
    .required('Пароль обов’язковий'),
});

interface RegistrationFormValues {
  name: string;
  email: string;
  password: string;
}

export default function RegistrationForm() {
  const fieldId = useId();
  const router = useRouter();
  const [user, setUser] = useState<{
    id: string;
    email: string;
    name: string;
  } | null>(null);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (values: RegistrationFormValues) => {
    setError('');
    try {
      const res = await registerUser(values);
      setUser(res.data.data);
      router.push('/onboarding');
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      setError(
        axiosError.response?.data?.message || 'Помилка під час реєстрації'
      );
    }
  };

  return (
    <div className={css.authContainer}>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={RegistrationFormSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <div className={css.formWrapper}>
            <Form className={css.form}>
              <fieldset className={css.fieldset}>
                <legend className={css.legend}>Реєстрація</legend>

                <label className={css.label} htmlFor={`${fieldId}-name`}>
                  Ім’я*
                </label>
                <Field
                  className={`${css.input} ${errors.name && touched.name ? css.inputError : ''}`}
                  type="text"
                  name="name"
                  id={`${fieldId}-name`}
                  placeholder="Ваше імʼя"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className={css.error}
                />

                <label className={css.label} htmlFor={`${fieldId}-email`}>
                  Пошта*
                </label>
                <Field
                  className={`${css.input} ${errors.email && touched.email ? css.inputError : ''}`}
                  type="email"
                  name="email"
                  id={`${fieldId}-email`}
                  placeholder="hello@leleka.com"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={css.error}
                />

                <label className={css.label} htmlFor={`${fieldId}-password`}>
                  Пароль*
                </label>
                <Field
                  className={`${css.input} ${errors.password && touched.password ? css.inputError : ''}`}
                  type="password"
                  name="password"
                  id={`${fieldId}-password`}
                  placeholder="********"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className={css.error}
                />

                {error && <div className={css.error}>{error}</div>}
              </fieldset>

              <button
                type="submit"
                disabled={isSubmitting}
                className={css.submitButton}
              >
                {isSubmitting ? 'Завантаження...' : 'Зареєструватись'}
              </button>

              <p className={css.loginLink}>
                Вже маєте акаунт?{' '}
                <Link href="/auth/login" className={css.link}>
                  Увійти
                </Link>
              </p>
            </Form>
          </div>
        )}
      </Formik>
      <div className={css.imageWrapper}>
        <Image
          src="/parent-register.png"
          alt="Registration Illustration"
          fill
          priority
          className={css.img}
        />
      </div>
    </div>
  );
}
