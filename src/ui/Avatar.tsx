import { HTMLAttributes } from "react";
import { Icon, type IconName } from "./Icon";
import "./Avatar.scss";

export type AvatarProps = HTMLAttributes<HTMLSpanElement> & {
  size?: number;
  src?: string;
  alt?: string;
  iconName?: IconName;
};

export function Avatar({
  size = 44,
  src,
  alt = "avatar",
  iconName = "placeholder",
  style,
  ...props
}: AvatarProps) {
  return (
    <span
      {...props}
      className="ui-avatar"
      style={{ width: size, height: size, ...style }}
      aria-label={alt}
    >
      {src ? (
        <img src={src} alt={alt} />
      ) : (
        <span className="ui-avatar__fallback" aria-hidden="true">
          <Icon name={iconName} width={size * 0.52} height={size * 0.52} alt="" />
        </span>
      )}
    </span>
  );
}
