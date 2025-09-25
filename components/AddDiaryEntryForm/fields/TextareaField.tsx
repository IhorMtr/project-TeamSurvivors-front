'use client';

import { useField } from 'formik';
import { TextareaFieldProps } from '@/types/diaryEntry';
import { FieldControl } from './FieldControl';
import s from '../AddDiaryEntryForm.module.css';

export function TextareaField({ name, label, placeholder }: TextareaFieldProps) {
  const [field, meta] = useField(name);
  const inputId = name as string;
  const className = meta.touched && meta.error ? `${s.textarea} ${s.invalid}` : s.textarea;

  return (
    <FieldControl
      label={label}
      htmlFor={inputId}
      error={meta.error}
      touched={meta.touched}
    >
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
