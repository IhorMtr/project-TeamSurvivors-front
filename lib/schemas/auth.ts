import * as Yup from 'yup';
export const LoginFormSchema = Yup.object().shape({
  email: Yup.string()
    .max(64, 'Email занадто довгий')
    .email('Невірний формат email')
    .required('Email обов’язковий'),
  password: Yup.string()
    .min(8, 'Пароль мінімум 8 символів')
    .max(128, 'Пароль занадто довгий')
    .required('Пароль обов’язковий'),
});

export const RegistrationFormSchema = Yup.object().shape({
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
