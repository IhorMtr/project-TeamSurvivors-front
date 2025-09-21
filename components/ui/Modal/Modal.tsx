'use client';

import { PropsWithChildren, useEffect, useRef, MouseEvent } from 'react';
import s from './Modal.module.css';

export type ModalProps = {
  isOpen: boolean;
  ariaLabel: string;
  onClose: () => void;
};

export function Modal({
  isOpen,
  ariaLabel,
  onClose,
  children,
}: PropsWithChildren<ModalProps>) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const onBackdrop = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === ref.current) onClose();
  };

  return (
    <div
      ref={ref}
      className={s.backdrop}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      onMouseDown={onBackdrop}
    >
      <div className={s.modal}>
        <button type="button" aria-label="Закрити" className={s.close} onClick={onClose}>
          <svg className={s.closeIcon} aria-hidden="true" focusable="false">
            <use href="/icons.svg#icon-close" xlinkHref="/icons.svg#icon-close" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}
