import { ButtonHTMLAttributes } from "react";
import "./Button.scss";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: 44 | 60;
};

export function Button({ variant = "primary", size = 44, ...props }: ButtonProps) {
  return (
    <button
      className={`ui-button ui-button--${variant} ui-button--h${size}`}
      {...props}
    />
  );
}
