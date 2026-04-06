import { ReactNode } from 'react';
import './View.scss';

export type ViewProps = {
  children: ReactNode;
  className?: string;
};

export function View({ children, className }: ViewProps) {
  const resolvedClassName = ['ui-view', className].filter(Boolean).join(' ');

  return <main className={resolvedClassName}>{children}</main>;
}
