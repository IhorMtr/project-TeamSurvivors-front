import * as yup from 'yup';

export const profileSchema = yup.object({
  name: yup
    .string()
    .min(2, "Ім'я повинно містити мінімум 2 символи")
    .max(50, "Ім'я не повинно перевищувати 50 символів")
    .nullable()
    .optional(),

  email: yup
    .string()
    .email('Невірний формат email')
    .max(64, 'Email занадто довгий')
    .nullable()
    .optional(),

  gender: yup
    .string()
    .oneOf(['boy', 'girl', 'unknown', ''], 'Оберіть коректну стать')
    .nullable()
    .optional(),

  dueDate: yup
    .string()
    .nullable()
    .optional()
    .test('is-not-past', 'Дата не може бути в минулому', value => {
      if (!value) return true;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return new Date(value) >= today;
    })
    .test('is-within-42-weeks', 'Вагітність триває до 42 тижнів', value => {
      if (!value) return true;
      const maxDate = new Date();
      maxDate.setDate(maxDate.getDate() + 42 * 7);
      return new Date(value) <= maxDate;
    }),
});

export type ProfileFormData = yup.InferType<typeof profileSchema>;
