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
    .test(
      'is-not-past',
      'Дата не може бути в минулому',
      (value) => {
        if (!value) return true; // Handled by .required()
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return new Date(value) >= today;
      }
    )
    .test(
      'is-within-42-weeks',
      'Вагітність триває до 42 тижнів',
      (value) => {
        if (!value) return true; // Handled by .required()
        const maxDate = new Date();
        maxDate.setDate(maxDate.getDate() + 42 * 7);
        return new Date(value) <= maxDate;
      }
    ),
});

export type ProfileFormData = yup.InferType<typeof profileSchema>;
