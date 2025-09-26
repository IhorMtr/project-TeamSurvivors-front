'use client';

import { Form, Formik, FormikHelpers } from 'formik';
import { useMemo } from 'react';
import { isAxiosError } from 'axios';
import s from './AddDiaryEntryForm.module.css';
import {
  AddDiaryEntryFormProps,
  AddDiaryEntryFormValues,
  DiaryCategoryOption,
} from '@/types/diaryEntry';
import { diaryEntrySchema } from '@/utils/schemas/diaryEntry';
import {
  createDiaryEntry,
  updateDiaryEntry,
  DiaryEntryRequestPayload,
} from '@/lib/api/diaryEntries';
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
  successMessage,
  errorMessage,
}: AddDiaryEntryFormProps) {
  const entryId = initialValues?.id;
  const options =
    categoryOptions && categoryOptions.length > 0
      ? categoryOptions
      : DEFAULT_OPTIONS;

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

  async function handleSubmit(
    values: AddDiaryEntryFormValues,
    helpers: FormikHelpers<AddDiaryEntryFormValues>
  ) {
    const { setSubmitting } = helpers;
    const requestPayload: DiaryEntryRequestPayload = {
      title: values.title.trim(),
      emotions: values.categories,
      description: values.text.trim(),
    };

    try {
      const shouldUpdate = mode === 'edit' || Boolean(entryId);

      if (shouldUpdate && entryId == null) {
        throw new Error('Не вдалося визначити запис для оновлення.');
      }

      const willUpdate = shouldUpdate && entryId != null;
      const data = willUpdate
        ? await updateDiaryEntry(entryId, requestPayload)
        : await createDiaryEntry(requestPayload);

      notify?.(
        'success',
        successMessage ?? (willUpdate ? 'Запис оновлено' : 'Запис створено')
      );
      onSuccess?.(data);
    } catch (error) {
      let message = errorMessage ?? 'Не вдалося зберегти запис.';

      if (isAxiosError(error)) {
        const responseMessage =
          (error.response?.data as { message?: string } | undefined)?.message;
        if (responseMessage) {
          message = responseMessage;
        } else if (error.message) {
          message = error.message;
        }
      } else if (error instanceof Error && error.message) {
        message = error.message;
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
            placeholder="Вкажіть назву запису"
            autoFocus
          />

          <CategoriesField
            name="categories"
            label="Емоції"
            placeholder="Оберіть емоції"
            options={options}
          />

          <TextareaField
            name="text"
            label="Опис"
            placeholder="Додайте текст про свій стан"
          />

          <button type="submit" className={s.submit} disabled={isSubmitting}>
            {isSubmitting ? 'Зберігаємо...' : 'Зберегти'}
          </button>
        </Form>
      )}
    </Formik>
  );
}
