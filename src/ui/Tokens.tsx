import { ReactNode, useEffect } from "react";

export type ThemeName = "dark" | "light";

export type ThemeProviderProps = {
  theme?: ThemeName;
  children: ReactNode;
};

export function ThemeProvider({ theme = "dark", children }: ThemeProviderProps) {
  useEffect(() => {
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, [theme]);

  return <>{children}</>;
}
