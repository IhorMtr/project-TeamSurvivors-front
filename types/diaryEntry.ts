import type { ReactNode } from 'react';
import type { Emotion } from './types';

export type DiaryCategoryOption = {
  id: string;
  title: string;
};

export type AddDiaryEntryFormValues = {
  title: string;
  categories: DiaryCategoryOption[];
  description: string;
};

export type NewDiary = {
  title: string;
  description: string;
  date: Date;
  emotions: Emotion[];
};

export type DiaryEntryInitialValues = Partial<
  AddDiaryEntryFormValues & { id?: string | number }
>;

export type DiaryEntryFormMode = 'create' | 'edit';

export type NotifyHandler = (
  type: 'success' | 'error',
  message: string
) => void;

export type AddDiaryEntryFormProps = {
  mode?: DiaryEntryFormMode;
  initialValues?: DiaryEntryInitialValues;
  categoryOptions?: DiaryCategoryOption[];
  onSuccess?: (data: DiaryData) => void;
  onError?: (error: unknown) => void;
  notify?: NotifyHandler;
  successMessage?: string;
  errorMessage?: string;
};

export type FieldControlProps = {
  label: string;
  htmlFor?: string;
  labelId?: string;
  error?: string;
  touched?: boolean;
  children: ReactNode;
};

export type TextFieldProps = {
  name: keyof AddDiaryEntryFormValues;
  label: string;
  placeholder: string;
  autoFocus?: boolean;
};

export type TextareaFieldProps = {
  name: keyof AddDiaryEntryFormValues;
  label: string;
  placeholder: string;
};

export type CategoriesFieldProps = {
  name: keyof AddDiaryEntryFormValues;
  label: string;
  placeholder: string;
  options: DiaryCategoryOption[];
};
