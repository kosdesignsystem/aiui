import { ImgHTMLAttributes } from "react";

const appIconModules = import.meta.glob("../assets/app_icons/*.svg", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const appIcons = Object.entries(appIconModules).reduce<Record<string, string>>((acc, [path, src]) => {
  const fileName = path.split("/").pop();
  if (!fileName) {
    return acc;
  }

  const iconName = fileName.replace(/\.svg$/i, "");
  acc[iconName] = src;
  return acc;
}, {});

export const appIconNames = Object.keys(appIcons).sort();

export type AppIconName = string;

export type AppIconProps = ImgHTMLAttributes<HTMLImageElement> & {
  name: AppIconName;
};

export function AppIcon({ name, ...props }: AppIconProps) {
  const src = appIcons[name] ?? appIcons.placeholder ?? null;

  if (!src) {
    return null;
  }

  return <img src={src} width={48} height={48} alt={props.alt ?? name} {...props} />;
}
