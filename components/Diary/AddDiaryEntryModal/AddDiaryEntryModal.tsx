"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import AddDiaryEntryForm from "./AddDiaryEntryForm";
import styles from "./AddDiaryEntryModal.module.css";

type AddDiaryEntryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  mode?: "create" | "edit";
  title?: string;
  className?: string;
  backdropClassName?: string;
  contentClassName?: string;
  formProps?: Record<string, unknown>;
};

export default function AddDiaryEntryModal({
  isOpen,
  onClose,
  mode = "create",
  title,
  className,
  backdropClassName,
  contentClassName,
  formProps,
}: AddDiaryEntryModalProps) {
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || containerRef.current) return;
    const el = document.createElement("div");
    el.setAttribute("data-modal-root", "add-diary-entry-modal");
    containerRef.current = el;
    document.body.appendChild(el);
    return () => {
      if (containerRef.current) {
        containerRef.current.remove();
        containerRef.current = null;
      } else {
        el.remove();
      }
    };
  }, [isMounted]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isMounted || !isOpen || !containerRef.current) return null;

  const defaultTitle = title ?? (mode === "edit" ? "Редагувати запис" : "Новий запис");

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const node = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={defaultTitle}
      onMouseDown={handleBackdropClick}
      className={[styles.backdrop, backdropClassName].filter(Boolean).join(" ")}
    >
      <div
        ref={dialogRef}
        className={[styles.panel, className, contentClassName].filter(Boolean).join(" ")}
      >
        <div className={styles.header}>
          <h3 className={styles.title}>{defaultTitle}</h3>
          <button aria-label="Закрити" onClick={onClose} className={styles.closeBtn}>
            ×
          </button>
        </div>
        <div className={styles.content}>
          <AddDiaryEntryForm {...(formProps || {})} />
        </div>
      </div>
    </div>
  );

  return createPortal(node, containerRef.current);
}
