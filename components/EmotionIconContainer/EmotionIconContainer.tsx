import { ReactNode } from 'react';
import css from './EmotionIconContainer.module.css';

export default function EmotionIconContainer({
  children,
}: {
  children?: ReactNode;
}) {
  return <div className={css.container}>{children}</div>;
}
