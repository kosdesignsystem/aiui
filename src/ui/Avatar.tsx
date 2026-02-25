import { HTMLAttributes } from "react";
import { Icon, type IconName } from "./Icon";
import "./Avatar.scss";

export const avatarBackgroundTokens = [
  "content-constant",
  "content-primary",
  "content-sub-primary",
  "content-secondary",
  "content-disabled",
  "content-border",
  "content-background",
  "accent-primary",
  "accent-sub-primary",
  "accent-secondary",
  "accent-disabled",
  "accent-border",
  "accent-background",
  "system-success-primary",
  "system-success-background",
  "system-error-primary",
  "system-error-background",
  "system-warning-primary",
  "sustem-warning-background",
  "system-warning-background",
  "background-primary",
  "background-secondary",
  "background-modal",
  "background-lvl1",
  "background-lvl2",
  "overlay-dark",
  "overlay-light",
  "red",
  "green",
  "purple",
  "orange",
  "blue",
] as const;

export type AvatarBackground = (typeof avatarBackgroundTokens)[number];

export type AvatarProps = HTMLAttributes<HTMLSpanElement> & {
  size?: number;
  src?: string;
  alt?: string;
  iconName?: IconName;
  background?: AvatarBackground;
};

export function Avatar({
  size = 44,
  src,
  alt = "avatar",
  iconName = "placeholder",
  background = "content-background",
  className,
  style,
  ...props
}: AvatarProps) {
  const classes = ["ui-avatar", className].filter(Boolean).join(" ");

  return (
    <span
      {...props}
      className={classes}
      style={{ width: size, height: size, background: `var(--${background})`, ...style }}
      aria-label={alt}
    >
      {src ? (
        <span className="ui-avatar__image">
          <img src={src} alt={alt} />
        </span>
      ) : (
        <span className="ui-avatar__icon" aria-hidden="true">
          <Icon name={iconName} width={24} height={24} alt="" />
        </span>
      )}
    </span>
  );
}
