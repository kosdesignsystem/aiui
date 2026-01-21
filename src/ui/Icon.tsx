import { ImgHTMLAttributes } from "react";

const icons = import.meta.glob("../assets/icons/*.svg", {
  eager: true,
  import: "default",
});

export type IconName = string;

export type IconProps = ImgHTMLAttributes<HTMLImageElement> & {
  name: IconName;
};

export function Icon({ name, ...props }: IconProps) {
  const iconPath = Object.keys(icons).find((path) => path.endsWith(`/${name}.svg`));
  const src = iconPath ? (icons[iconPath] as string) : null;

  if (!src) {
    return null;
  }

  return <img src={src} width={24} height={24} alt={name} {...props} />;
}
