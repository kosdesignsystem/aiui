import { ImgHTMLAttributes } from "react";

export type AvatarProps = ImgHTMLAttributes<HTMLImageElement> & {
  size?: number;
};

export function Avatar({ size = 40, style, ...props }: AvatarProps) {
  return (
    <img
      {...props}
      className="ui-avatar"
      style={{ width: size, height: size, borderRadius: "50%", ...style }}
      alt={props.alt ?? "avatar"}
    />
  );
}
