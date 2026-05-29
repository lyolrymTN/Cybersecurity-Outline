"use client";

import { useEffect } from "react";
import { X, AlertTriangle, ArrowRight, ArrowLeft, FileText, ExternalLink } from "lucide-react";
import type { Course } from "@/lib/types";
import { CATEGORY_STYLES, RISK_STYLES } from "@/lib/types";
import { getCourse, getDependents, OFFICIAL_PDF_URL } from "@/lib/data";
import { computeRiskLevel } from "@/lib/prerequisite";
import { useLang } from "./LanguageProvider";
import { OfferedBadge } from "./CourseBadge";

export function CourseDetailDrawer({
  course,
  onClose,
  onSelect,
}: {
  course: Course | null;
  onClose: () => void;
  onSelect?: (id: string) => void;
}) {
  const { t, courseName, courseSub } = useLang();

  useEffect(() => {
    if (!course) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [course, onClose]);

  if (!course) return null;
  const style = CATEGORY_STYLES[course.category];
  const risk = computeRiskLevel(course.id);
  const dependents = getDependents(course.id);
  const prereqIds = Array.from(
    new Set(
      course.prerequisites.flatMap((p) => p.courses ?? []).filter(Boolean) as string[],
    ),
  );

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <aside className="absolute right-0 top-0 h-full w-full max-w-xl bg-white shadow-2xl overflow-y-auto scroll-fade dark:bg-navy-950">
        <header className={`relative ${style.color} ${style.text} px-6 py-5`}>
          <button
            aria-label={t("common.close")}
            onClick={onClose}
            className="absolute right-4 top-4 rounded-md p-1.5 hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
          <p className="font-mono text-xs opacity-90">{course.code}</p>
          <h2 className="mt-1 text-xl font-semibold leading-tight">{courseName(course)}</h2>
          <p className="text-sm opacity-90">{courseSub(course)}</p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-white/15 px-2 py-1">
              {course.creditStructure ?? `${course.credits} ${t("common.credits")}`}
            </span>
            <span className="rounded-full bg-white/15 px-2 py-1">{style.label}</span>
            {course.year && course.semester && (
              <span className="rounded-full bg-white/15 px-2 py-1">
                {t("common.year")} {course.year} / {t("common.semester")} {course.semester}
              </span>
            )}
          </div>
          {course.offered && (
            <div className="mt-2">
              <OfferedBadge status={course.offered} term={course.offeredTerm} />
            </div>
          )}
        </header>

        <div className="px-6 py-6 space-y-6">
          <section>
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
              {t("drawer.risk")}
            </h3>
            <div className="mt-2 flex items-center gap-3">
              <span className={`badge ${RISK_STYLES[risk].chip}`}>{RISK_STYLES[risk].label}</span>
              {course.needsVerification && (
                <span className="badge border-amber-300 bg-amber-50 text-amber-700">
                  {t("common.needsVerify")}
                </span>
              )}
            </div>
            {course.riskReason && (
              <p className="mt-2 text-sm text-slate-600">{course.riskReason}</p>
            )}
          </section>

          <section>
            <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2 dark:text-slate-100">
              <ArrowLeft className="h-4 w-4 text-cyan-600" /> {t("drawer.prereqs")}
            </h3>
            {prereqIds.length === 0 ? (
              <p className="mt-2 text-sm text-slate-500">{t("drawer.noPrereq")}</p>
            ) : (
              <ul className="mt-2 space-y-1.5">
                {prereqIds.map((id) => {
                  const c = getCourse(id);
                  return (
                    <li key={id}>
                      <button
                        onClick={() => onSelect?.(id)}
                        className="w-full text-left rounded-md border border-slate-200 px-3 py-2 hover:bg-slate-50 dark:border-navy-700 dark:hover:bg-navy-800"
                      >
                        <p className="font-mono text-[11px] text-slate-500">
                          {c?.code ?? id}
                        </p>
                        <p className="text-sm text-slate-800 dark:text-slate-100">
                          {c ? courseName(c) : t("common.needsVerify")}
                        </p>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
            {course.prerequisites.some((p) => p.note) && (
              <ul className="mt-2 text-xs text-amber-700 space-y-1">
                {course.prerequisites
                  .filter((p) => p.note)
                  .map((p, i) => (
                    <li key={i} className="flex gap-1">
                      <AlertTriangle className="h-3.5 w-3.5 mt-0.5" />
                      {p.note}
                    </li>
                  ))}
              </ul>
            )}
          </section>

          <section>
            <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2 dark:text-slate-100">
              <ArrowRight className="h-4 w-4 text-fuchsia-600" /> {t("drawer.dependents")}
            </h3>
            {dependents.length === 0 ? (
              <p className="mt-2 text-sm text-slate-500">{t("drawer.noDependents")}</p>
            ) : (
              <ul className="mt-2 space-y-1.5">
                {dependents.map((c) => (
                  <li key={c.id}>
                    <button
                      onClick={() => onSelect?.(c.id)}
                      className="w-full text-left rounded-md border border-slate-200 px-3 py-2 hover:bg-slate-50 dark:border-navy-700 dark:hover:bg-navy-800"
                    >
                      <p className="font-mono text-[11px] text-slate-500">{c.code}</p>
                      <p className="text-sm text-slate-800 dark:text-slate-100">{courseName(c)}</p>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section>
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
              {t("drawer.failImpact")}
            </h3>
            <div className="mt-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
              {dependents.length === 0 ? (
                <p>{t("drawer.noDependents")}</p>
              ) : (
                <p>
                  {dependents.length}{" "}
                  {t("common.subjects")}
                </p>
              )}
            </div>
          </section>

          {course.descriptionThai && (
            <section>
              <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                {t("drawer.description")}
              </h3>
              <p className="mt-2 text-sm text-slate-700 leading-relaxed dark:text-slate-300">
                {course.descriptionThai}
              </p>
            </section>
          )}

          {(course.instructor || course.offeredNote) && (
            <section className="rounded-lg border border-slate-200 dark:border-navy-700 p-3 text-sm space-y-1">
              {course.instructor && (
                <p className="text-slate-700 dark:text-slate-200">
                  <span className="font-semibold">{t("electives.instructor")}: </span>
                  {course.instructor}
                </p>
              )}
              {course.offeredNote && (
                <p className="text-amber-700 dark:text-amber-300 text-xs">
                  {course.offeredNote}
                </p>
              )}
            </section>
          )}

          <section className="rounded-lg border border-slate-200 dark:border-navy-700 p-3 text-xs text-slate-500 dark:text-slate-400 space-y-1">
            <p className="font-semibold text-slate-700 dark:text-slate-200">
              {t("electives.source")}
            </p>
            <p>Source page {course.sourcePage ?? "—"}</p>
            <a
              href={OFFICIAL_PDF_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-cyan-700 dark:text-cyan-300 hover:underline"
            >
              <FileText className="h-3 w-3" />
              {t("source.officialPdf")}
              <ExternalLink className="h-3 w-3" />
            </a>
          </section>

          <section>
            <p className="text-[11px] text-slate-400">{t("drawer.disclaimer")}</p>
          </section>
        </div>
      </aside>
    </div>
  );
}
