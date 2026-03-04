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

export type AvatarProps = {
  size?: number;
  src?: string;
  alt?: string;
  iconName?: IconName;
  text?: string;
  background?: AvatarBackground;
};

export function Avatar({
  size = 44,
  src,
  alt = "avatar",
  iconName,
  text,
  background = "content-background",
}: AvatarProps) {
  const textContent = text?.trim();
  const hasImage = Boolean(src);
  const hasIcon = !hasImage && Boolean(iconName);
  const hasText = !hasImage && !hasIcon && Boolean(textContent);
  const fallbackIcon = iconName ?? "placeholder";

  return (
    <span
      className="ui-avatar"
      style={{ width: size, height: size, background: `var(--${background})` }}
      aria-label={alt}
    >
      {hasImage ? (
        <span className="ui-avatar__image">
          <img src={src} alt={alt} />
        </span>
      ) : hasIcon ? (
        <span className="ui-avatar__fallback" aria-hidden="true">
          <Icon name={fallbackIcon} width={24} height={24} alt="" />
        </span>
      ) : hasText ? (
        <span className="ui-avatar__fallback ui-avatar__text">{textContent}</span>
      ) : (
        <span className="ui-avatar__fallback" aria-hidden="true">
          <Icon name={fallbackIcon} width={24} height={24} alt="" />
        </span>
      )}
    </span>
  );
}
