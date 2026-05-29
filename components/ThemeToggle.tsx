"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useLang } from "./LanguageProvider";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const { t } = useLang();
  const isDark = theme === "dark";
  const label = isDark ? t("common.theme.toLight") : t("common.theme.toDark");

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-navy-700 transition hover:bg-slate-50 dark:border-navy-700 dark:bg-navy-900 dark:text-cyan-300 dark:hover:bg-navy-800 ${className}`}
    >
      <Sun
        className={`h-4 w-4 transition-all ${
          isDark ? "scale-0 -rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
        } absolute`}
      />
      <Moon
        className={`h-4 w-4 transition-all ${
          isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 rotate-90 opacity-0"
        }`}
      />
    </button>
  );
}
