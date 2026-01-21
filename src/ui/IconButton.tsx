import { ButtonHTMLAttributes } from "react";

export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: number;
};

export function IconButton({ size = 40, style, ...props }: IconButtonProps) {
  return (
    <button
      className="ui-icon-button"
      style={{ width: size, height: size, ...style }}
      {...props}
    />
  );
}
