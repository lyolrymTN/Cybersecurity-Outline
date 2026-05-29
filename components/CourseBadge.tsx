"use client";

import {
  CATEGORY_STYLES,
  type CourseCategory,
  OFFERED_STYLES,
  type OfferedStatus,
  RISK_STYLES,
  type RiskLevel,
} from "@/lib/types";
import { useLang } from "./LanguageProvider";

export function CategoryBadge({ category }: { category: CourseCategory }) {
  const s = CATEGORY_STYLES[category];
  return (
    <span className={`badge border-transparent ${s.color} ${s.text}`}>
      {s.label}
    </span>
  );
}

export function CreditBadge({ credits, structure }: { credits: number; structure?: string }) {
  const { t } = useLang();
  return (
    <span className="badge border-slate-200 bg-slate-50 text-slate-700 dark:border-navy-700 dark:bg-navy-800 dark:text-slate-200">
      <span className="font-mono">
        {structure ?? `${credits} ${t("common.credits")}`}
      </span>
    </span>
  );
}

export function RiskBadge({ level }: { level: RiskLevel }) {
  const s = RISK_STYLES[level];
  return <span className={`badge ${s.chip}`}>{s.label}</span>;
}

export function PrereqBadge({ count }: { count: number }) {
  const { t } = useLang();
  if (count === 0)
    return (
      <span className="badge border-slate-200 bg-white text-slate-500 dark:border-navy-700 dark:bg-navy-900 dark:text-slate-400">
        {t("common.noPrereq")}
      </span>
    );
  return (
    <span className="badge border-cyan-200 bg-cyan-50 text-cyan-700 dark:border-cyan-700/40 dark:bg-cyan-500/10 dark:text-cyan-300">
      {t("common.mustPass")} {count} {t("common.subjects")}
    </span>
  );
}

export function OfferedBadge({
  status,
  term,
}: {
  status: OfferedStatus;
  term?: string;
}) {
  const { locale } = useLang();
  const s = OFFERED_STYLES[status];
  const label = locale === "en" ? s.labelEn : s.labelTh;
  return (
    <span className={`badge ${s.chip}`}>
      <span className={`mr-1 inline-block h-1.5 w-1.5 rounded-full ${s.dot}`} aria-hidden />
      {label}
      {term ? ` · ${term}` : ""}
    </span>
  );
}

export function VerifyNote() {
  const { t } = useLang();
  return (
    <span className="badge border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-300">
      {t("common.needsVerify")}
    </span>
  );
}
