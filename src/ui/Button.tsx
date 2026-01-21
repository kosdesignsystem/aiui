import { ButtonHTMLAttributes } from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({ variant = "primary", ...props }: ButtonProps) {
  return <button className={`ui-button ui-button--${variant}`} {...props} />;
}
