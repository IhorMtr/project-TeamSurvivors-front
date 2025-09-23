"use client";

import { Form, Formik, FormikHelpers, useField } from "formik";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import * as Yup from "yup";
import s from "./AddDiaryEntryForm.module.css";

export type DiaryCategoryOption = {
  value: string;
  label: string;
};

export type AddDiaryEntryFormValues = {
  title: string;
  categories: string[];
  text: string;
};

type Notify = (type: "success" | "error", message: string) => void;

type AddDiaryEntryFormProps = {
  mode?: "create" | "edit";
  initialValues?: Partial<AddDiaryEntryFormValues & { id?: string | number }>;
  categoryOptions?: DiaryCategoryOption[];
  onSuccess?: (data: unknown) => void;
  onError?: (error: unknown) => void;
  notify?: Notify;
  apiBase?: string;
  apiPath?: string;
  method?: "POST" | "PUT";
  headers?: Record<string, string>;
  successMessage?: string;
  errorMessage?: string;
};

const DEFAULT_OPTIONS: DiaryCategoryOption[] = [
  { value: "joy", label: "Радість" },
  { value: "sadness", label: "Смуток" },
  { value: "anger", label: "Злість" },
  { value: "fear", label: "Страх" },
  { value: "surprise", label: "Подив" },
  { value: "calm", label: "Спокій" },
];

const validationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .min(2, "Назва має містити щонайменше 2 символи")
    .max(120, "Назва не повинна перевищувати 120 символів")
    .required("Обов'язкове поле"),
  categories: Yup.array().of(Yup.string()).optional(),
  text: Yup.string()
    .trim()
    .min(3, "Текст має містити щонайменше 3 символи")
    .required("Обов'язкове поле"),
});

export default function AddDiaryEntryForm({
  mode = "create",
  initialValues,
  categoryOptions,
  onSuccess,
  onError,
  notify,
  apiBase,
  apiPath = "/diary",
  method,
  headers,
  successMessage,
  errorMessage,
}: AddDiaryEntryFormProps) {
  const entryId = initialValues?.id;
  const options = categoryOptions && categoryOptions.length > 0 ? categoryOptions : DEFAULT_OPTIONS;

  const API_BASE = useMemo(
    () => apiBase ?? process.env.NEXT_PUBLIC_API_BASE ?? process.env.API_BASE ?? "",
    [apiBase]
  );

  const formInitialValues: AddDiaryEntryFormValues = useMemo(
    () => ({
      title: initialValues?.title ?? "",
      categories: initialValues?.categories ?? [],
      text: initialValues?.text ?? (initialValues as { content?: string } | undefined)?.content ?? "",
    }),
    [initialValues]
  );

  const computedMethod: "POST" | "PUT" = method ?? (mode === "edit" || entryId ? "PUT" : "POST");

  async function handleSubmit(
    values: AddDiaryEntryFormValues,
    helpers: FormikHelpers<AddDiaryEntryFormValues>
  ) {
    const { setSubmitting } = helpers;
    const payload = {
      title: values.title.trim(),
      categories: values.categories,
      text: values.text.trim(),
    };

    const normalizedPath = `/${(apiPath || "/diary").replace(/^\/+/ , "")}`;
    const resourcePath =
      computedMethod === "PUT" && entryId != null
        ? `${normalizedPath}/${entryId}`
        : normalizedPath;
    const endpoint = API_BASE
      ? `${API_BASE.replace(/\/$/, "")}${resourcePath}`
      : resourcePath;

    try {
      const response = await fetch(endpoint, {
        method: computedMethod,
        headers: {
          "Content-Type": "application/json",
          ...(headers || {}),
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const fallbackError = errorMessage ?? "Помилка збереження запису";
        const errorText = (await response.text().catch(() => "")).trim();
        const message = errorText ? `${fallbackError}: ${errorText}` : fallbackError;
        notify?.("error", message);
        const error = new Error(message);
        onError?.(error);
        return;
      }

      const data = await response.json().catch(() => ({}));
      notify?.("success", successMessage ?? (mode === "edit" ? "Запис оновлено" : "Запис створено"));
      onSuccess?.(data);
    } catch (error) {
      const message = errorMessage ?? "Сталася помилка під час запиту";
      notify?.("error", message);
      onError?.(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Formik
      initialValues={formInitialValues}
      validationSchema={validationSchema}
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
            {isSubmitting ? "Збереження..." : "Зберегти"}
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
  const showError = Boolean(touched && error);

  return (
    <div className={s.field} data-invalid={showError || undefined}>
      <label className={s.label} htmlFor={htmlFor} id={labelId}>
        {label}
      </label>
      {children}
      {showError && <span className={s.error}>{error}</span>}
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
  const inputId = name as string;
  const className = meta.touched && meta.error ? `${s.input} ${s.invalid}` : s.input;

  return (
    <FieldControl label={label} htmlFor={inputId} error={meta.error} touched={meta.touched}>
      <input
        {...field}
        id={inputId}
        type="text"
        className={className}
        placeholder={placeholder}
        autoFocus={autoFocus}
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
  const inputId = name as string;
  const className = meta.touched && meta.error ? `${s.textarea} ${s.invalid}` : s.textarea;

  return (
    <FieldControl label={label} htmlFor={inputId} error={meta.error} touched={meta.touched}>
      <textarea
        {...field}
        id={inputId}
        className={className}
        placeholder={placeholder}
        rows={6}
      />
    </FieldControl>
  );
}

type CategoriesFieldProps = {
  name: keyof AddDiaryEntryFormValues;
  label: string;
  placeholder: string;
  options: DiaryCategoryOption[];
};

function CategoriesField({ name, label, placeholder, options }: CategoriesFieldProps) {
  const [field, meta, helpers] = useField<string[]>(name);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const selectedValues = useMemo(() => (Array.isArray(field.value) ? field.value : []), [field.value]);
  const labelId = `${name as string}-label`;
  const triggerId = `${name as string}-trigger`;

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current) return;
      if (containerRef.current.contains(event.target as Node)) return;
      setIsOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const selectedOptions = useMemo(() => {
    const index = new Map(options.map((item) => [item.value, item.label] as const));
    return selectedValues
      .map((value) => {
        const optionLabel = index.get(value);
        return optionLabel ? { value, label: optionLabel } : null;
      })
      .filter(Boolean) as Array<{ value: string; label: string }>;
  }, [selectedValues, options]);

  const toggleOption = (value: string) => {
    const next = selectedValues.includes(value)
      ? selectedValues.filter((item) => item !== value)
      : [...selectedValues, value];
    helpers.setValue(next);
    helpers.setTouched(true, true);
  };

  const handleToggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const dropdownId = `${name as string}-dropdown`;
  const triggerClass = meta.touched && meta.error ? `${s.selectTrigger} ${s.invalid}` : s.selectTrigger;

  return (
    <FieldControl label={label} labelId={labelId} error={meta.error} touched={meta.touched}>
      <div ref={containerRef} className={s.selectWrapper} data-open={isOpen || undefined}>
        <button
          type="button"
          id={triggerId}
          className={triggerClass}
          onClick={handleToggleOpen}
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
          <div id={dropdownId} className={s.dropdown} role="listbox" aria-labelledby={labelId}>
            {options.length === 0 ? (
              <p className={s.empty}>Категорії недоступні</p>
            ) : (
              <ul className={s.options}>
                {options.map((option) => {
                  const checked = selectedValues.includes(option.value);
                  return (
                    <li key={option.value}>
                      <label className={s.option}>
                        <input
                          type="checkbox"
                          className={s.checkbox}
                          checked={checked}
                          onChange={() => toggleOption(option.value)}
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
