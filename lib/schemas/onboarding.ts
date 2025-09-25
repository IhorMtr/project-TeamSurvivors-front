import * as Yup from 'yup';

export const onboardingValidationSchema = Yup.object({
  gender: Yup.string().required('Оберіть стать дитини'),
  dueDate: Yup.string().required('Вкажіть дату пологів'),
  avatar: Yup.mixed<File>()
    .nullable()
    .test(
      'fileSize',
      'Фото повинно бути менше 5MB',
      value => !value || value.size <= 5 * 1024 * 1024
    ),
});
