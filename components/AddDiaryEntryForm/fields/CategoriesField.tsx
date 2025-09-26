'use client';

import { useEffect, useRef, useState } from 'react';
import { useField } from 'formik';
import { CategoriesFieldProps, DiaryCategoryOption } from '@/types/diaryEntry';
import { FieldControl } from './FieldControl';
import s from '../AddDiaryEntryForm.module.css';

export function CategoriesField({
  name,
  label,
  placeholder,
  options,
}: CategoriesFieldProps) {
  // The field's value is an array of DiaryCategoryOption objects
  const [field, meta, helpers] = useField<DiaryCategoryOption[]>(name);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const selectedOptions = Array.isArray(field.value) ? field.value : [];
  const labelId = `${name}-label`;
  const triggerId = `${name}-trigger`;

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleOption = (option: DiaryCategoryOption) => {
    const isSelected = selectedOptions.some(item => item.id === option.id);
    const nextValue = isSelected
      ? selectedOptions.filter(item => item.id !== option.id)
      : [...selectedOptions, option];
    helpers.setValue(nextValue);
    helpers.setTouched(true, true);
  };

  const handleToggleOpen = () => {
    setIsOpen(prev => !prev);
  };

  const dropdownId = `${name}-dropdown`;
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
              selectedOptions.map(option => (
                <span key={option.id} className={s.chip}>
                  {option.title}
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
                  const checked = selectedOptions.some(item => item.id === option.id);
                  return (
                    <li key={option.id}>
                      <label className={s.option}>
                        <input
                          type="checkbox"
                          className={s.checkbox}
                          checked={checked}
                          onChange={() => toggleOption(option)}
                        />
                        <span className={s.checkboxBox} aria-hidden="true">
                          {checked && <span className={s.checkboxMark} />} 
                        </span>
                        <span className={s.optionLabel}>{option.title}</span>
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