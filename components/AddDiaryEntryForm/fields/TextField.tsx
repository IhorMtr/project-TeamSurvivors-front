'use client';

import { useField } from 'formik';
import { TextFieldProps } from '@/types/diaryEntry';
import { FieldControl } from './FieldControl';
import s from '../AddDiaryEntryForm.module.css';

export function TextField({ name, label, placeholder, autoFocus }: TextFieldProps) {
  const [field, meta] = useField(name);
  const inputId = name as string;
  const className = meta.touched && meta.error ? `${s.input} ${s.invalid}` : s.input;

  return (
    <FieldControl
      label={label}
      htmlFor={inputId}
      error={meta.error}
      touched={meta.touched}
    >
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
