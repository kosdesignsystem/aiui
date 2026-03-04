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

export type AppIconProps = {
  name: AppIconName;
  alt?: string;
  width?: number;
  height?: number;
  "aria-hidden"?: boolean | "true" | "false";
};

export function AppIcon({
  name,
  alt,
  width = 48,
  height = 48,
  "aria-hidden": ariaHidden = false,
}: AppIconProps) {
  const src = appIcons[name] ?? appIcons.placeholder ?? null;

  if (!src) {
    return null;
  }

  const isAriaHidden = ariaHidden === true || ariaHidden === "true";
  const resolvedAlt = alt ?? (isAriaHidden ? "" : name);

  return (
    <img
      src={src}
      width={width}
      height={height}
      alt={resolvedAlt}
      aria-hidden={ariaHidden}
    />
  );
}
