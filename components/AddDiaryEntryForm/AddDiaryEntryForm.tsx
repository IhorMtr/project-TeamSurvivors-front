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
import { useQuery } from '@tanstack/react-query';
import { TextField, TextareaField, CategoriesField } from './fields';

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
  const {
    data: emotionOptions,
    isLoading: isLoadingEmotions,
  } = useQuery<DiaryCategoryOption[]>({
    queryKey: ['emotions'],
    queryFn: async () => {
      const res = await fetch('/lehlehka_app.emotions.json');
      if (!res.ok) {
        throw new Error('Failed to fetch emotions');
      }
      return res.json();
    },
    staleTime: Infinity, // Fetch once
  });

  const entryId = initialValues?.id;
  const options =
    categoryOptions && categoryOptions.length > 0
      ? categoryOptions
      : emotionOptions || [];

  const formInitialValues: AddDiaryEntryFormValues = useMemo(
    () => ({
      title: initialValues?.title ?? '',
      categories: initialValues?.categories ?? [],
      description:
        initialValues?.description ??
        (initialValues as { content?: string } | undefined)?.content ??
        '',
    }),
    [initialValues]
  );

  async function handleSubmit(
    values: AddDiaryEntryFormValues,
    helpers: FormikHelpers<AddDiaryEntryFormValues>
  ) {
    const { setSubmitting, resetForm } = helpers;
    const requestPayload: DiaryEntryRequestPayload = {
      title: values.title.trim(),
      emotions: values.categories.map(option => option.id),
      description: values.description.trim(),
      date: new Date().toISOString().slice(0, 10), // YYYY-MM-DD
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
      resetForm();
    } catch (error) {
      let message = errorMessage ?? 'Не вдалося зберегти запис.';

      if (isAxiosError(error)) {
        const responseMessage = (
          error.response?.data as { message?: string } | undefined
        )?.message;
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
            placeholder={isLoadingEmotions ? 'Завантаження...' : 'Оберіть емоції'}
            options={options}
          />

          <TextareaField
            name="description"
            label="Опис"
            placeholder="Додайте текст про свій стан"
          />

          <button
            type="submit"
            className={s.submit}
            disabled={isSubmitting || isLoadingEmotions}
          >
            {isSubmitting ? 'Зберігаємо...' : 'Зберегти'}
          </button>
        </Form>
      )}
    </Formik>
  );
}
