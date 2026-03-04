import { CSSProperties, KeyboardEventHandler, MouseEventHandler, ReactNode } from "react";
import type { AvatarBackground } from "./Avatar";
import "./IconButton.scss";

export type IconButtonProps = {
  size?: 44 | 60;
  background?: AvatarBackground;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  title?: string;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onKeyDown?: KeyboardEventHandler<HTMLButtonElement>;
  "aria-label"?: string;
};

export function IconButton({
  size = 44,
  background,
  type = "button",
  disabled = false,
  title,
  children,
  onClick,
  onKeyDown,
  "aria-label": ariaLabel,
}: IconButtonProps) {
  const classes = ["ui-icon-button", `ui-icon-button--${size}`].join(" ");
  const backgroundStyle = background
    ? ({ "--ui-icon-button-background": `var(--${background})` } as CSSProperties)
    : undefined;

  return (
    <button
      type={type}
      disabled={disabled}
      title={title}
      onClick={onClick}
      onKeyDown={onKeyDown}
      aria-label={ariaLabel}
      className={classes}
      style={backgroundStyle}
    >
      {children}
    </button>
  );
}
