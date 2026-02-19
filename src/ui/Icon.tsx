import { ImgHTMLAttributes } from "react";

const iconModules = import.meta.glob("../assets/icons/*.svg", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const icons = Object.entries(iconModules).reduce<Record<string, string>>((acc, [path, src]) => {
  const fileName = path.split("/").pop();
  if (!fileName) {
    return acc;
  }

  const iconName = fileName.replace(/\.svg$/i, "");
  acc[iconName] = src;
  return acc;
}, {});

export const iconNames = Object.keys(icons).sort();

export type IconName = string;

export type IconProps = ImgHTMLAttributes<HTMLImageElement> & {
  name: IconName;
};

export function Icon({ name, ...props }: IconProps) {
  const src = icons[name] ?? icons.placeholder ?? null;

  if (!src) {
    return null;
  }

  return <img src={src} width={24} height={24} alt={props.alt ?? name} {...props} />;
}
