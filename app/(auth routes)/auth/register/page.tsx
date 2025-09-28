'use client';

import { useId, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import css from '../AuthForm.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { AxiosError } from 'axios';
import { registerUser, loginUser } from '@/lib/api/auth';
import type { RegisterRequest } from '@/lib/api/auth';
import { RegistrationFormSchema } from '@/lib/schemas/auth';
import { toast } from 'react-hot-toast';

type RegistrationFormValues = RegisterRequest;

export default function RegistrationForm() {
  const fieldId = useId();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (
    values: RegistrationFormValues,
    { validateForm }: FormikHelpers<RegistrationFormValues>
  ) => {
    const validationErrors = await validateForm(values);
    if (Object.keys(validationErrors).length > 0) {
      Object.values(validationErrors).forEach(msg => {
        toast.error(String(msg));
      });
      return;
    }

    try {
      await registerUser(values);

      await loginUser({
        email: values.email,
        password: values.password,
      });

      toast.success('Реєстрація успішна!');
      router.push('/profile/edit');
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      let message = 'Сталася невідома помилка. Спробуйте пізніше.';

      if (error.response) {
        const status = error.response.status;
        switch (status) {
          case 400:
            message =
              error.response.data?.message ||
              'Некоректні дані у формі. Перевірте введені значення.';
            break;
          case 409:
            message = 'Користувач із таким email вже існує.';
            break;
          case 500:
            message = 'Помилка сервера. Спробуйте трохи пізніше.';
            break;
          default:
            message =
              error.response.data?.message || 'Помилка під час реєстрації.';
        }
      } else if (error.request) {
        message = 'Немає з’єднання з сервером. Перевірте інтернет.';
      }

      toast.error(message);
    }
  };

  return (
    <div className={css.authContainer}>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={RegistrationFormSchema}
        onSubmit={handleSubmit}
        validateOnBlur={true}
        validateOnChange={false}
      >
        {({ values, errors, touched, isSubmitting }) => (
          <div className={css.formWrapper}>
            <Form className={css.form}>
              <fieldset className={css.fieldset}>
                <legend className={css.legend}>Реєстрація</legend>

                <label className={css.label} htmlFor={`${fieldId}-name`}>
                  Ім’я*
                </label>
                <Field
                  className={`${css.input} ${
                    errors.name && touched.name ? css.inputError : ''
                  }`}
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
                  className={`${css.input} ${
                    errors.email && touched.email ? css.inputError : ''
                  }`}
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
                <div className={css.passwordWrapper}>
                  <Field
                    className={`${css.input} ${
                      errors.password && touched.password ? css.inputError : ''
                    }`}
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    id={`${fieldId}-password`}
                    placeholder="********"
                  />
                  <button
                    type="button"
                    className={css.passwordToggle}
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={!values.password}
                  >
                    <Image
                      src={showPassword ? '/eye-open.png' : '/eye-closed.png'}
                      alt="Toggle password visibility"
                      width={20}
                      height={20}
                    />
                  </button>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className={css.error}
                />
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
          sizes="(max-width: 1439px) 0px, 50vw"
        />
      </div>
    </div>
  );
}
