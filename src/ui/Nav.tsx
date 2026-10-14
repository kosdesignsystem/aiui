import type { ReactNode } from 'react';
import { Text } from './Fonts';
import { cn } from './lib/cn';
import './Nav.scss';

export type NavItem = {
  id: string;
  label?: ReactNode;
  icon?: ReactNode;
  active?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
};

export type NavProps = {
  items: NavItem[];
  className?: string;
  ariaLabel?: string;
};

export function Nav({ items, className, ariaLabel }: NavProps) {
  return (
    <nav className={cn('ui-nav', className)} aria-label={ariaLabel}>
      {items.map((item) => {
        const itemAriaLabel =
          item['aria-label'] ??
          (typeof item.label === 'string' ? item.label : undefined);

        return (
          <button
            key={item.id}
            type="button"
            className={cn('ui-nav__item', item.active ? 'is-active' : '', item.className)}
            onClick={item.onClick}
            disabled={item.disabled}
            aria-disabled={item.disabled}
            aria-current={item.active ? 'page' : undefined}
            aria-label={itemAriaLabel}
          >
            {item.icon}
            {item.label ? (
              <Text
                variant="regular-14"
                color={
                  item.disabled
                    ? "disabled"
                    : item.active
                      ? "primary"
                      : "secondary"
                }
              >
                {item.label}
              </Text>
            ) : null}
          </button>
        );
      })}
    </nav>
  );
}
