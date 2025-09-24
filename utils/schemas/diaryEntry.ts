import * as Yup from 'yup';

export const diaryEntrySchema = Yup.object({
  title: Yup.string()
    .trim()
    .min(2, 'Назва має містити щонайменше 2 символи')
    .max(120, 'Назва не повинна перевищувати 120 символів')
    .required("Обов'язкове поле"),
  categories: Yup.array()
    .of(Yup.string().trim().required('Оберіть категорію'))
    .min(1, 'Оберіть щонайменше одну категорію')
    .required("Категорії обов'язкові"),
  text: Yup.string()
    .trim()
    .min(3, 'Текст має містити щонайменше 3 символи')
    .required("Обов'язкове поле"),
});
