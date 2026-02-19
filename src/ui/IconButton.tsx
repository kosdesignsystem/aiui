import { ButtonHTMLAttributes } from "react";
import "./IconButton.scss";

export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: 44 | 60;
};

export function IconButton({ size = 44, ...props }: IconButtonProps) {
  return <button className={`ui-icon-button ui-icon-button--${size}`} {...props} />;
}
