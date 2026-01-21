import { ReactNode } from "react";

export type FontVariant = "title" | "subtitle" | "body" | "caption";

const variantClass: Record<FontVariant, string> = {
  title: "font-title",
  subtitle: "font-subtitle",
  body: "font-body",
  caption: "font-caption",
};

export type TextProps = {
  variant?: FontVariant;
  children: ReactNode;
};

export function Text({ variant = "body", children }: TextProps) {
  return <span className={variantClass[variant]}>{children}</span>;
}
