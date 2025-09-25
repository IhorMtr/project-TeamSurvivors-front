'use client';

import { Form, Formik, FormikHelpers } from 'formik';
import { useMemo } from 'react';
import s from './AddDiaryEntryForm.module.css';
import {
  AddDiaryEntryFormProps,
  AddDiaryEntryFormValues,
  DiaryCategoryOption,
} from '@/types/diaryEntry';
import { diaryEntrySchema } from '@/utils/schemas/diaryEntry';
import { saveDiaryEntry } from '@/lib/api/diaryEntries';
import { TextField, TextareaField, CategoriesField } from './fields';

const DEFAULT_OPTIONS: DiaryCategoryOption[] = [
  { value: 'joy', label: 'Радість' },
  { value: 'sadness', label: 'Смуток' },
  { value: 'anger', label: 'Злість' },
  { value: 'fear', label: 'Страх' },
  { value: 'surprise', label: 'Подив' },
  { value: 'calm', label: 'Спокій' },
];

export default function AddDiaryEntryForm({
  mode = 'create',
  initialValues,
  categoryOptions,
  onSuccess,
  onError,
  notify,
  apiBase,
  apiPath = '/api/diaries',
  method,
  headers,
  successMessage,
  errorMessage,
}: AddDiaryEntryFormProps) {
  const entryId = initialValues?.id;
  const options =
    categoryOptions && categoryOptions.length > 0
      ? categoryOptions
      : DEFAULT_OPTIONS;

  const API_BASE = useMemo(
    () =>
      apiBase ?? process.env.NEXT_PUBLIC_API_BASE ?? process.env.API_BASE ?? '',
    [apiBase]
  );

  const formInitialValues: AddDiaryEntryFormValues = useMemo(
    () => ({
      title: initialValues?.title ?? '',
      categories: initialValues?.categories ?? [],
      text:
        initialValues?.text ??
        (initialValues as { content?: string } | undefined)?.content ??
        '',
    }),
    [initialValues]
  );

  const computedMethod: 'POST' | 'PUT' =
    method ?? (mode === 'edit' || entryId ? 'PUT' : 'POST');

  async function handleSubmit(
    values: AddDiaryEntryFormValues,
    helpers: FormikHelpers<AddDiaryEntryFormValues>
  ) {
    const { setSubmitting } = helpers;
    const requestPayload = {
      title: values.title.trim(),
      emotions: values.categories,
      description: values.text.trim(),
    };

    try {
      const shouldUpdate = computedMethod === 'PUT';
      const targetEntryId = shouldUpdate ? entryId : undefined;

      if (shouldUpdate && targetEntryId == null) {
        throw new Error('Відсутній ідентифікатор запису для оновлення');
      }

      const data = await saveDiaryEntry(requestPayload, {
        entryId: targetEntryId,
        apiBase: API_BASE,
        apiPath,
        headers,
        method: computedMethod,
        errorMessage,
      });

      notify?.(
        'success',
        successMessage ?? (shouldUpdate ? 'Запис оновлено' : 'Запис створено')
      );
      onSuccess?.(data);
    } catch (error) {
      let message = errorMessage ?? 'Сталася помилка під час запиту';

      if (error && typeof error === 'object') {
        const maybeAxiosError = error as {
          message?: string;
        };

        if (maybeAxiosError.message) {
          message = maybeAxiosError.message;
        }
      }

      notify?.('error', message);
      onError?.(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Formik
      initialValues={formInitialValues}
      validationSchema={diaryEntrySchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ isSubmitting }) => (
        <Form className={s.form} noValidate>
          <TextField
            name="title"
            label="Заголовок"
            placeholder="Введіть назву запису"
            autoFocus
          />

          <CategoriesField
            name="categories"
            label="Категорії"
            placeholder="Обрати категорії"
            options={options}
          />

          <TextareaField
            name="text"
            label="Запис"
            placeholder="Опишіть ваші думки або відчуття"
          />

          <button type="submit" className={s.submit} disabled={isSubmitting}>
            {isSubmitting ? 'Збереження...' : 'Зберегти'}
          </button>
        </Form>
      )}
    </Formik>
  );
}
