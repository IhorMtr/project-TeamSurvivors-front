'use client';

import { Formik, Form, FormikHelpers, useField } from 'formik';
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import * as Yup from 'yup';
import s from './AddDiaryEntryForm.module.css';

export type DiaryCategoryOption = {
  value: string;
  label: string;
};

export type AddDiaryEntryFormValues = {
  title: string;
  categories: string[];
  text: string;
};

type Props = {
  initialValues: AddDiaryEntryFormValues;
  categoryOptions: DiaryCategoryOption[];
  onSubmit: (
    values: AddDiaryEntryFormValues,
    helpers: FormikHelpers<AddDiaryEntryFormValues>
  ) => void | Promise<void>;
  submitButtonLabel?: string;
};

const validationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .min(2, 'Мінімум 2 символи')
    .max(120, 'Максимум 120 символів')
    .required('Заповніть поле'),
  categories: Yup.array()
    .of(Yup.string().trim())
    .min(1, 'Оберіть мінімум одну категорію'),
  text: Yup.string().trim().min(1, 'Заповніть поле').required('Заповніть поле'),
});

export function AddDiaryEntryForm({
  initialValues,
  categoryOptions,
  onSubmit,
  submitButtonLabel = 'Зберегти',
}: Props) {
  const formInitialValues = useMemo(() => initialValues, [initialValues]);

  return (
    <Formik
      initialValues={formInitialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ isSubmitting }) => (
        <Form className={s.form} noValidate>
          <TextField
            name="title"
            label="Заголовок"
            placeholder="Введіть заголовок запису"
            autoFocus
          />

          <CategoriesField
            name="categories"
            label="Категорії"
            options={categoryOptions}
            placeholder="Оберіть категорію"
          />

          <TextareaField
            name="text"
            label="Запис"
            placeholder="Запишіть, як ви себе відчуваєте"
          />

          <button type="submit" className={s.submit} disabled={isSubmitting}>
            {isSubmitting ? 'Збереження...' : submitButtonLabel}
          </button>
        </Form>
      )}
    </Formik>
  );
}

type FieldControlProps = {
  label: string;
  htmlFor?: string;
  labelId?: string;
  error?: string;
  touched?: boolean;
  children: ReactNode;
};

function FieldControl({ label, htmlFor, labelId, error, touched, children }: FieldControlProps) {
  const hasError = Boolean(touched && error);

  return (
    <div className={s.field} data-invalid={hasError || undefined}>
      <label className={s.label} htmlFor={htmlFor} id={labelId}>
        {label}
      </label>
      {children}
      {hasError && <span className={s.error}>{error}</span>}
    </div>
  );
}

type TextFieldProps = {
  name: keyof AddDiaryEntryFormValues;
  label: string;
  placeholder: string;
  autoFocus?: boolean;
};

function TextField({ name, label, placeholder, autoFocus }: TextFieldProps) {
  const [field, meta] = useField(name);
  const hasError = Boolean(meta.touched && meta.error);
  const id = name as string;

  return (
    <FieldControl label={label} htmlFor={id} error={meta.error} touched={meta.touched}>
      <input
        {...field}
        id={id}
        autoFocus={autoFocus}
        type="text"
        placeholder={placeholder}
        className={`${s.input} ${hasError ? s.invalid : ''}`}
      />
    </FieldControl>
  );
}

type TextareaFieldProps = {
  name: keyof AddDiaryEntryFormValues;
  label: string;
  placeholder: string;
};

function TextareaField({ name, label, placeholder }: TextareaFieldProps) {
  const [field, meta] = useField(name);
  const hasError = Boolean(meta.touched && meta.error);
  const id = name as string;

  return (
    <FieldControl label={label} htmlFor={id} error={meta.error} touched={meta.touched}>
      <textarea
        {...field}
        id={id}
        placeholder={placeholder}
        className={`${s.textarea} ${hasError ? s.invalid : ''}`}
        rows={6}
      />
    </FieldControl>
  );
}

type CategoriesFieldProps = {
  name: keyof AddDiaryEntryFormValues;
  label: string;
  options: DiaryCategoryOption[];
  placeholder: string;
};

function CategoriesField({ name, label, options, placeholder }: CategoriesFieldProps) {
  const [field, meta, helpers] = useField<string[]>({ name });
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasError = Boolean(meta.touched && meta.error);
  const selectedValues = useMemo(
    () => (Array.isArray(field.value) ? field.value : []),
    [field.value]
  );
  const labelId = `${name as string}-label`;
  const triggerId = `${name as string}-trigger`;

  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    const handleClick = (event: MouseEvent) => {
      if (!containerRef.current) return;
      if (containerRef.current.contains(event.target as Node)) return;
      setIsOpen(false);
    };

    document.addEventListener('keydown', handleKey);
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('mousedown', handleClick);
    };
  }, [isOpen]);

  const selectedOptions = useMemo(() => {
    const map = new Map(options.map((item) => [item.value, item.label] as const));
    return selectedValues
      .map((value) => {
        const labelText = map.get(value);
        return labelText ? { value, label: labelText } : null;
      })
      .filter(Boolean) as Array<{ value: string; label: string }>;
  }, [selectedValues, options]);

  const onOptionToggle = (value: string) => {
    const next = selectedValues.includes(value)
      ? selectedValues.filter((item) => item !== value)
      : [...selectedValues, value];
    helpers.setValue(next);
    helpers.setTouched(true, true);
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const dropdownId = `${name as string}-dropdown`;

  return (
    <FieldControl label={label} labelId={labelId} error={meta.error} touched={meta.touched}>
      <div ref={containerRef} className={s.selectWrapper} data-open={isOpen || undefined}>
        <button
          type="button"
          id={triggerId}
          className={`${s.selectTrigger} ${hasError ? s.invalid : ''}`}
          onClick={handleToggle}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={dropdownId}
          aria-labelledby={`${labelId} ${triggerId}`}
        >
          <div className={s.selectContent}>
            {selectedOptions.length > 0 ? (
              selectedOptions.map(({ value, label: optionLabel }) => (
                <span key={value} className={s.chip}>
                  {optionLabel}
                </span>
              ))
            ) : (
              <span className={s.placeholder}>{placeholder}</span>
            )}
          </div>
          <span className={s.chevron} aria-hidden="true" />
        </button>

        {isOpen && (
          <div
            id={dropdownId}
            className={s.dropdown}
            role="listbox"
            aria-labelledby={labelId}
          >
            {options.length === 0 ? (
              <p className={s.empty}>Немає доступних категорій</p>
            ) : (
              <ul className={s.options}>
                {options.map((option) => {
                  const checked = selectedValues.includes(option.value);
                  return (
                    <li key={option.value}>
                      <label className={s.option}>
                        <input
                          className={s.checkbox}
                          type="checkbox"
                          checked={checked}
                          onChange={() => onOptionToggle(option.value)}
                        />
                        <span className={s.checkboxBox} aria-hidden="true">
                          {checked && <span className={s.checkboxMark} />}
                        </span>
                        <span className={s.optionLabel}>{option.label}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}
      </div>
    </FieldControl>
  );
}
