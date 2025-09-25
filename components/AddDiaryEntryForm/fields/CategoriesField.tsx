'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useField } from 'formik';
import { CategoriesFieldProps } from '@/types/diaryEntry';
import { FieldControl } from './FieldControl';
import s from '../AddDiaryEntryForm.module.css';

export function CategoriesField({
  name,
  label,
  placeholder,
  options,
}: CategoriesFieldProps) {
  const [field, meta, helpers] = useField<string[]>(name);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const selectedValues = useMemo(
    () => (Array.isArray(field.value) ? field.value : []),
    [field.value]
  );
  const labelId = `${name as string}-label`;
  const triggerId = `${name as string}-trigger`;

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current) return;
      if (containerRef.current.contains(event.target as Node)) return;
      setIsOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const selectedOptions = useMemo(() => {
    const index = new Map(
      options.map(item => [item.value, item.label] as const)
    );
    return selectedValues
      .map(value => {
        const optionLabel = index.get(value);
        return optionLabel ? { value, label: optionLabel } : null;
      })
      .filter(Boolean) as Array<{ value: string; label: string }>;
  }, [selectedValues, options]);

  const toggleOption = (value: string) => {
    const next = selectedValues.includes(value)
      ? selectedValues.filter(item => item !== value)
      : [...selectedValues, value];
    helpers.setValue(next);
    helpers.setTouched(true, true);
  };

  const handleToggleOpen = () => {
    setIsOpen(prev => !prev);
  };

  const dropdownId = `${name as string}-dropdown`;
  const triggerClass =
    meta.touched && meta.error
      ? `${s.selectTrigger} ${s.invalid}`
      : s.selectTrigger;

  return (
    <FieldControl
      label={label}
      labelId={labelId}
      error={meta.error}
      touched={meta.touched}
    >
      <div
        ref={containerRef}
        className={s.selectWrapper}
        data-open={isOpen || undefined}
      >
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
          <svg className={s.chevron} aria-hidden="true" focusable="false">
            <use href="/icons.svg#icon-chevron_down" />
          </svg>
        </button>

        {isOpen && (
          <div
            id={dropdownId}
            className={s.dropdown}
            role="listbox"
            aria-labelledby={labelId}
          >
            {options.length === 0 ? (
              <p className={s.empty}>Категорії недоступні</p>
            ) : (
              <ul className={s.options}>
                {options.map(option => {
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
