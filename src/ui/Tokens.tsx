import { ReactNode, useEffect } from "react";

export type ThemeName = "dark" | "light";

export type ThemeProviderProps = {
  theme?: ThemeName;
  children: ReactNode;
};

export function ThemeProvider({ theme = "light", children }: ThemeProviderProps) {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return <>{children}</>;
}
