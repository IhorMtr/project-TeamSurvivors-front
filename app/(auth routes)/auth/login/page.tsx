'use client';

import { useId, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { loginUser } from '../../../../lib/api/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import css from '../AuthForm.module.css';
import Image from 'next/image';
import { LoginFormSchema } from '@/lib/schemas/auth';
import { User } from '../../../../types/user';
import { useAuthStore } from '../../../../lib/store/authStore';
import { toast } from 'react-hot-toast';
import { getCurrentUser } from '@/lib/api/clientApi';
import GoogleLoginButton from '@/components/GoogleLoginButton/GoogleLoginButton';

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginForm() {
  const fieldId = useId();
  const router = useRouter();
  const { setUser, clearIsAuthenticated } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (
    values: LoginFormValues,
    { validateForm }: FormikHelpers<LoginFormValues>
  ) => {
    const validationErrors = await validateForm(values);
    if (Object.keys(validationErrors).length > 0) {
      Object.values(validationErrors).forEach(msg => {
        toast.error(String(msg));
      });
      return;
    }

    try {
      clearIsAuthenticated();
      await loginUser(values);

      const user: User = await getCurrentUser();
      setUser(user);

      toast.success('Вхід успішний!');
      router.push('/');
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      let message = 'Сталася невідома помилка. Спробуйте пізніше.';

      if (error.response) {
        const status = error.response.status;
        switch (status) {
          case 400:
            message =
              error.response.data?.message || 'Некоректні дані у формі.';
            break;
          case 401:
            message = 'Невірний логін або пароль.';
            break;
          case 500:
            message = 'Помилка сервера. Спробуйте знову пізніше.';
            break;
          default:
            message = error.response.data?.message || 'Помилка авторизації.';
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
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginFormSchema}
        onSubmit={handleSubmit}
        validateOnBlur={true}
        validateOnChange={false}
      >
        {({ values, errors, touched, isSubmitting }) => (
          <div className={css.formWrapper}>
            <Form className={css.form}>
              <fieldset className={css.fieldset}>
                <legend className={css.legend}>Вхід</legend>

                <label
                  className={css.label}
                  htmlFor={`${fieldId}-email`}
                ></label>
                <Field
                  className={`${css.input} ${
                    errors.email && touched.email ? css.inputError : ''
                  }`}
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

                <label
                  className={css.label}
                  htmlFor={`${fieldId}-password`}
                ></label>
                <div className={css.passwordWrapper}>
                  <Field
                    className={`${css.input} ${
                      errors.password && touched.password ? css.inputError : ''
                    }`}
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    id={`${fieldId}-password`}
                    placeholder="Пароль"
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
                className={css.button}
              >
                {isSubmitting ? 'Завантаження...' : 'Увійти'}
              </button>
              <GoogleLoginButton text="Увійти через Google" />

              <p className={css.registerLink}>
                Немає аккаунту?{' '}
                <Link href="/auth/register" className={css.link}>
                  Зареєструватися
                </Link>
              </p>
            </Form>
          </div>
        )}
      </Formik>
      <div className={css.imageWrapper}>
        <Image
          src="/nest-login.png"
          alt="Login Illustration"
          fill
          priority
          className={css.img}
          sizes="(max-width: 1439px) 0px, 50vw"
        />
      </div>
    </div>
  );
}
