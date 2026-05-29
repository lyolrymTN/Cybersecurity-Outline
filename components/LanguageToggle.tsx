"use client";

import { useLang } from "./LanguageProvider";

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { locale, toggle, t } = useLang();
  const next = locale === "th" ? "en" : "th";
  const label = locale === "th" ? t("common.lang.switchToEn") : t("common.lang.switchToTh");

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`relative inline-flex h-9 min-w-[3.25rem] items-center justify-center gap-1 rounded-lg border border-slate-200 bg-white px-2 text-xs font-semibold text-navy-700 transition hover:bg-slate-50 dark:border-navy-700 dark:bg-navy-900 dark:text-cyan-300 dark:hover:bg-navy-800 ${className}`}
    >
      <span className={locale === "th" ? "opacity-100" : "opacity-40"}>TH</span>
      <span className="text-slate-300 dark:text-navy-700">/</span>
      <span className={locale === "en" ? "opacity-100" : "opacity-40"}>EN</span>
    </button>
  );
}
