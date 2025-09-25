'use client';

import { useId, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import css from '../AuthForm.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { AxiosError } from 'axios';
import { registerUser, loginUser } from '@/lib/api/auth';
import type { RegisterRequest } from '@/lib/api/auth';
import { RegistrationFormSchema } from '@/lib/schemas/auth';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

type RegistrationFormValues = RegisterRequest;

export default function RegistrationForm() {
  const fieldId = useId();
  const router = useRouter();

  const [error, setError] = useState<string>('');

  const handleSubmit = async (values: RegistrationFormValues) => {
    try {
      await registerUser(values);

      await loginUser({
        email: values.email,
        password: values.password,
      });

      router.push('/profile/edit');
    } catch (err) {
      const axiosError = err as AxiosError<{ message?: string }>;
      let errorMessage = 'Помилка під час реєстрації';

      if (axiosError.response?.status === 409) {
        errorMessage = 'Такий email вже існує';
      } else if (axiosError.response?.data?.message) {
        errorMessage = axiosError.response.data.message;
      }
      setError(errorMessage); // встановлюємо локально
      toast.error(errorMessage); // і показуємо тост
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
