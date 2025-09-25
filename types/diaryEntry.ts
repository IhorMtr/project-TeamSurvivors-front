import type { ReactNode } from 'react';
import type { Emotion } from './types';



export type DiaryCategoryOption = {
  value: string;
  label: string;
};

export type AddDiaryEntryFormValues = {
  title: string;
  categories: string[];
  text: string;
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

export type NotifyHandler = (type: 'success' | 'error', message: string) => void;

export type AddDiaryEntryFormProps = {
  mode?: DiaryEntryFormMode;
  initialValues?: DiaryEntryInitialValues;
  categoryOptions?: DiaryCategoryOption[];
  onSuccess?: (data: unknown) => void;
  onError?: (error: unknown) => void;
  notify?: NotifyHandler;
  apiBase?: string;
  apiPath?: string;
  method?: 'POST' | 'PUT';
  headers?: Record<string, string>;
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
