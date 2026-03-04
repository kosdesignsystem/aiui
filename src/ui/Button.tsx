import { KeyboardEventHandler, MouseEventHandler, ReactNode } from "react";
import "./Button.scss";

export type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost";
  size?: 44 | 60;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  title?: string;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onKeyDown?: KeyboardEventHandler<HTMLButtonElement>;
  "aria-label"?: string;
};

export function Button({
  variant = "primary",
  size = 44,
  type = "button",
  disabled = false,
  title,
  children,
  onClick,
  onKeyDown,
  "aria-label": ariaLabel,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      title={title}
      onClick={onClick}
      onKeyDown={onKeyDown}
      aria-label={ariaLabel}
      className={`ui-button ui-button--${variant} ui-button--h${size}`}
    >
      {children}
    </button>
  );
}
