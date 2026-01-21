import { ImgHTMLAttributes } from "react";

const appIcons = import.meta.glob("../assets/app_icons/*.svg", {
  eager: true,
  import: "default",
});

export type AppIconName = string;

export type AppIconProps = ImgHTMLAttributes<HTMLImageElement> & {
  name: AppIconName;
};

export function AppIcon({ name, ...props }: AppIconProps) {
  const iconPath = Object.keys(appIcons).find((path) => path.endsWith(`/${name}.svg`));
  const src = iconPath ? (appIcons[iconPath] as string) : null;

  if (!src) {
    return null;
  }

  return <img src={src} width={48} height={48} alt={name} {...props} />;
}
