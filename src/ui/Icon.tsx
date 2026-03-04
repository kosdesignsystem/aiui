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

export type IconProps = {
  name: IconName;
  alt?: string;
  width?: number;
  height?: number;
  "aria-hidden"?: boolean | "true" | "false";
};

export function Icon({
  name,
  alt,
  width = 24,
  height = 24,
  "aria-hidden": ariaHidden = false,
}: IconProps) {
  const src = icons[name] ?? icons.placeholder ?? null;

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
