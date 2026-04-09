import { ReactNode } from "react";
import "./Nav.scss";

export type NavItem = {
  id: string;
  label?: ReactNode;
  icon?: ReactNode;
  active?: boolean;
  onClick?: () => void;
  disabled?: boolean;
};

export type NavProps = {
  items: NavItem[];
};

export function Nav({ items }: NavProps) {
  return (
    <nav className="ui-nav">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`ui-nav__item${item.active ? " is-active" : ""}`}
            onClick={item.onClick}
            disabled={item.disabled}
            aria-disabled={item.disabled}
          >
            {item.icon}
            {item.label ? (
              <span className="ui-nav__label">{item.label}</span>
            ) : null}
          </button>
        ))}
    </nav>
  );
}
