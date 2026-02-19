import { ReactNode } from "react";
import "./Nav.scss";

export type NavItem = {
  id: string;
  label?: string;
  icon?: ReactNode;
  active?: boolean;
  onClick?: () => void;
};

export type NavProps = {
  items: NavItem[];
  variant: "text" | "icon" | "icon-label";
};

export function Nav({ items, variant }: NavProps) {
  return (
    <nav className="ui-nav">
      <div className="ui-nav__track" data-variant={variant}>
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`ui-nav__item${item.active ? " is-active" : ""}`}
            onClick={item.onClick}
          >
            {item.icon}
            {variant !== "icon" && item.label ? (
              <span className="ui-nav__label">{item.label}</span>
            ) : null}
          </button>
        ))}
      </div>
    </nav>
  );
}
