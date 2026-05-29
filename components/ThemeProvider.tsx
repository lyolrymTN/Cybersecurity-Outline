"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggle: () => void;
  setTheme: (t: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem('cy-theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (prefersDark ? 'dark' : 'light');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {}
})();
`;

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    const current = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
    setThemeState(current);
  }, []);

  const apply = useCallback((next: Theme) => {
    if (typeof document === "undefined") return;
    if (next === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("cy-theme", next);
    } catch {}
    setThemeState(next);
  }, []);

  const toggle = useCallback(() => {
    apply(theme === "dark" ? "light" : "dark");
  }, [theme, apply]);

  return (
    <ThemeContext.Provider value={{ theme, toggle, setTheme: apply }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) return { theme: "light" as Theme, toggle: () => {}, setTheme: () => {} };
  return ctx;
}
