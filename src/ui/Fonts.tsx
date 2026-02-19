import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

export const textVariantsByFamily = {
  semiBold: [
    "semiBold-52",
    "semiBold-48",
    "semiBold-40",
    "semiBold-32",
    "semiBold-24",
    "semiBold-20",
    "semiBold-16",
    "semiBold-14",
  ],
  medium: [
    "medium-32",
    "medium-24",
    "medium-20",
    "medium-18",
    "medium-16",
    "medium-14",
    "medium-12",
  ],
  regular: [
    "regular-24",
    "regular-20",
    "regular-18",
    "regular-16",
    "regular-14",
    "regular-12",
  ],
} as const;

export const fontFamilies = {
  sansText: "ui-text-family-sans-text",
  clock: "ui-text-family-clock",
  mono: "ui-text-family-mono",
} as const;

const variantClass = {
  "semiBold-52": "text-semi-bold-52",
  "semiBold-48": "text-semi-bold-48",
  "semiBold-40": "text-semi-bold-40",
  "semiBold-32": "text-semi-bold-32",
  "semiBold-24": "text-semi-bold-24",
  "semiBold-20": "text-semi-bold-20",
  "semiBold-16": "text-semi-bold-16",
  "semiBold-14": "text-semi-bold-14",
  "medium-32": "text-medium-32",
  "medium-24": "text-medium-24",
  "medium-20": "text-medium-20",
  "medium-18": "text-medium-18",
  "medium-16": "text-medium-16",
  "medium-14": "text-medium-14",
  "medium-12": "text-medium-12",
  "regular-24": "text-regular-24",
  "regular-20": "text-regular-20",
  "regular-18": "text-regular-18",
  "regular-16": "text-regular-16",
  "regular-14": "text-regular-14",
  "regular-12": "text-regular-12",
} as const;

export type FontVariant = keyof typeof variantClass;
export type FontFamily = keyof typeof fontFamilies;

export type TextProps<T extends ElementType = "span"> = {
  as?: T;
  family?: FontFamily;
  variant?: FontVariant;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function Text<T extends ElementType = "span">({
  as,
  family = "sansText",
  variant = "regular-16",
  children,
  className,
  ...props
}: TextProps<T>) {
  const Component = as ?? "span";
  const familyToken = fontFamilies[family];
  const fontClass = variantClass[variant];
  const classes = className
    ? `ui-text ${familyToken} ${fontClass} ${className}`
    : `ui-text ${familyToken} ${fontClass}`;

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}
