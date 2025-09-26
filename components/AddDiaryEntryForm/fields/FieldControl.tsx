'use client';

import { FieldControlProps } from '@/types/diaryEntry';
import s from '../AddDiaryEntryForm.module.css';

export function FieldControl({
  label,
  htmlFor,
  labelId,
  error,
  touched,
  children,
}: FieldControlProps) {
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
