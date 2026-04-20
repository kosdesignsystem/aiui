import { ReactNode } from "react";
import { Text } from "./Fonts";
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
        ))}
    </nav>
  );
}
