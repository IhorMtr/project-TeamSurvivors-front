import * as yup from 'yup';

export const profileSchema = yup.object({
  name: yup
    .string()
    .required("Ім'я обов'язкове")
    .min(2, "Ім'я повинно містити мінімум 2 символи")
    .max(50, "Ім'я не повинно перевищувати 50 символів"),

  email: yup
    .string()
    .required("Email обов'язковий")
    .email('Невірний формат email'),

  gender: yup
    .string()
    .required('Оберіть стать дитини')
    .oneOf(['boy', 'girl', 'unknown'], 'Оберіть коректну стать'),

  dueDate: yup
    .string()
    .required("Планова дата пологів обов'язкова")
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Дата повинна бути у форматі YYYY-MM-DD'),
});

export type ProfileFormData = yup.InferType<typeof profileSchema>;
