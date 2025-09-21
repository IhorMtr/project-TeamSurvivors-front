'use client';

import React from 'react';
import { Modal } from '@/components/ui/Modal';
import s from './ConfirmationModal.module.css';

type Props = {
  isOpen: boolean;
  title: string;
  confirmButtonText?: string; // по умолчанию "Так"
  cancelButtonText?: string;  // по умолчанию "Ні"
  onConfirm: () => void;
  onCancel: () => void;
};

function splitBeforeLastWord(str: string) {
  const text = (str ?? '').trim().replace(/\s+/g, ' ');
  const i = text.lastIndexOf(' ');
  if (i === -1) return { head: text, tail: '' };
  return { head: text.slice(0, i), tail: text.slice(i + 1) };
}

export default function ConfirmationModal({
  isOpen,
  title,
  confirmButtonText = 'Так',
  cancelButtonText = 'Ні',
  onConfirm,
  onCancel,
}: Props) {
  const { head, tail } = splitBeforeLastWord(title);

  return (
    <Modal isOpen={isOpen} ariaLabel={title} onClose={onCancel}>
      <h2 className={s.title}>
        <span className={s.titleHead}>
          {head}
          {tail && ' '}
        </span>
        {tail && <span className={s.titleTail}>{tail}</span>}
      </h2>

      <div className={s.buttons}>
        <button type="button" className={`${s.btn} ${s.cancel}`} onClick={onCancel}>
          {cancelButtonText}
        </button>
        <button type="button" className={`${s.btn} ${s.confirm}`} onClick={onConfirm}>
          {confirmButtonText}
        </button>
      </div>
    </Modal>
  );
}
