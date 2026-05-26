import type { HTMLAttributes, KeyboardEvent, ReactNode } from 'react';
import { cn } from './lib/cn';
import './Cell.scss';

export type CellVariant = 'accent' | 'primary' | 'default';

export type CellProps = Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'onClick'> & {
  title: ReactNode;
  subtitle?: ReactNode;
  leading?: ReactNode;
  trailing?: ReactNode;
  variant?: CellVariant;
  onClick?: () => void;
};

export function Cell({
  title,
  subtitle,
  leading,
  trailing,
  variant = 'default',
  onClick,
  className,
  onKeyDown,
  ...props
}: CellProps) {
  const isInteractive = typeof onClick === 'function';
  const shellClassName = cn(
    'ui-cell-shell',
    `ui-cell-shell--${variant}`,
    isInteractive ? 'is-interactive' : '',
    className,
  );

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!onClick) {
      onKeyDown?.(event);
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick();
    }

    onKeyDown?.(event);
  };

  return (
    <div
      {...props}
      className={shellClassName}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      <div className={cn('ui-cell', !leading ? 'ui-cell--without-leading' : '')}>
        {leading ? <div className="ui-cell__leading">{leading}</div> : null}
        <div className="ui-cell__content">
          <div className="ui-cell__title">{title}</div>
          {subtitle ? <div className="ui-cell__subtitle">{subtitle}</div> : null}
        </div>
        {trailing ? <div className="ui-cell__trailing">{trailing}</div> : null}
      </div>
    </div>
  );
}
