'use client';

import { FormikHelpers } from 'formik';
import { toast } from 'react-hot-toast';
import { Modal } from '@/components/ui/Modal';
import {
  AddDiaryEntryForm,
  AddDiaryEntryFormValues,
  DiaryCategoryOption,
} from './AddDiaryEntryForm';
import s from './AddDiaryEntryModal.module.css';

export type AddDiaryEntryModalMode = 'create' | 'edit';

type Props = {
  isOpen: boolean;
  mode?: AddDiaryEntryModalMode;
  initialValues?: Partial<AddDiaryEntryFormValues>;
  categoryOptions: DiaryCategoryOption[];
  onClose: () => void;
  onSubmit: (values: AddDiaryEntryFormValues) => Promise<void>;
  titleOverride?: string;
  submitButtonLabel?: string;
};

const DEFAULT_VALUES: AddDiaryEntryFormValues = {
  title: '',
  categories: [],
  text: '',
};

export function AddDiaryEntryModal({
  isOpen,
  mode = 'create',
  initialValues,
  categoryOptions,
  onClose,
  onSubmit,
  titleOverride,
  submitButtonLabel,
}: Props) {
  const heading = titleOverride ?? (mode === 'edit' ? 'Редагувати запис' : 'Новий запис');

  const safeCategories = Array.isArray(initialValues?.categories)
    ? initialValues.categories.filter(Boolean)
    : DEFAULT_VALUES.categories;

  const formInitialValues: AddDiaryEntryFormValues = {
    ...DEFAULT_VALUES,
    ...initialValues,
    title: initialValues?.title ?? DEFAULT_VALUES.title,
    categories: safeCategories,
    text: initialValues?.text ?? DEFAULT_VALUES.text,
  };

  const handleSubmit = async (
    values: AddDiaryEntryFormValues,
    helpers: FormikHelpers<AddDiaryEntryFormValues>
  ) => {
    const payload: AddDiaryEntryFormValues = {
      title: values.title.trim(),
      categories: values.categories,
      text: values.text.trim(),
    };

    try {
      await onSubmit(payload);
      helpers.resetForm({ values: mode === 'edit' ? payload : DEFAULT_VALUES });
      onClose();
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : 'Не вдалося зберегти запис. Спробуйте ще раз.';
      toast.error(message);
      helpers.setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} ariaLabel={heading} onClose={onClose}>
      <div className={s.container}>
        <h2 className={s.heading}>{heading}</h2>

        <AddDiaryEntryForm
          initialValues={formInitialValues}
          categoryOptions={categoryOptions}
          onSubmit={handleSubmit}
          submitButtonLabel={submitButtonLabel}
        />
      </div>
    </Modal>
  );
}
