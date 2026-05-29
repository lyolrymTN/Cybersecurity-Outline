"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { DEFAULT_LOCALE, type Locale, t as translate } from "@/lib/i18n";
import type { Course } from "@/lib/types";

type LangContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggle: () => void;
  t: (key: string) => string;
  courseName: (c: Course) => string;
  courseSub: (c: Course) => string;
};

const LangContext = createContext<LangContextValue | null>(null);

export const LANG_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem('cy-locale');
    var nav = (navigator.language || 'th').toLowerCase();
    var locale = stored || (nav.startsWith('th') ? 'th' : 'en');
    document.documentElement.setAttribute('lang', locale);
    document.documentElement.setAttribute('data-locale', locale);
  } catch (e) {}
})();
`;

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    const current = (document.documentElement.getAttribute("data-locale") as Locale) ||
      DEFAULT_LOCALE;
    setLocaleState(current);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    document.documentElement.setAttribute("lang", next);
    document.documentElement.setAttribute("data-locale", next);
    try {
      localStorage.setItem("cy-locale", next);
    } catch {}
    setLocaleState(next);
  }, []);

  const toggle = useCallback(() => {
    setLocale(locale === "th" ? "en" : "th");
  }, [locale, setLocale]);

  const t = useCallback((key: string) => translate(key, locale), [locale]);

  const courseName = useCallback(
    (c: Course) => (locale === "en" ? c.englishName : c.thaiName),
    [locale],
  );
  const courseSub = useCallback(
    (c: Course) => (locale === "en" ? c.thaiName : c.englishName),
    [locale],
  );

  return (
    <LangContext.Provider value={{ locale, setLocale, toggle, t, courseName, courseSub }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) {
    return {
      locale: "th" as Locale,
      setLocale: () => {},
      toggle: () => {},
      t: (k: string) => translate(k, "th"),
      courseName: (c: Course) => c.thaiName,
      courseSub: (c: Course) => c.englishName,
    };
  }
  return ctx;
}
