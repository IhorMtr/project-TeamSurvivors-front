'use client';

import { useId, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
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

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginForm() {
  const fieldId = useId();
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      await loginUser(values);

      const user: User = await getCurrentUser();
      setUser(user);

      toast.success('Вхід успішний!');

      // const estimateBirthDate = user.dueDate ?? '';
      // if (user.dueDate) {
      //   router.push(`/weeks/my-day/${estimateBirthDate}`);
      // } else {
      //   router.push('/weeks/my-day-demo');
      // }
      router.push('/journey');

    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const message =
        error.response?.data?.message || 'Невірно вказаний логін чи пароль';
      toast.error(message);
    }
  };

  return (
    <div className={css.authContainer}>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginFormSchema}
        onSubmit={handleSubmit}
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

                <label
                  className={css.label}
                  htmlFor={`${fieldId}-password`}
                ></label>
                <div className={css.passwordWrapper}>
                  <Field
                    className={`${css.input} ${errors.password && touched.password ? css.inputError : ''}`}
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
