"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, AlertTriangle, FileText, ExternalLink } from "lucide-react";
import type { Course } from "@/lib/types";
import { CATEGORY_STYLES, RISK_STYLES } from "@/lib/types";
import { getCourse, getDependents, OFFICIAL_PDF_URL } from "@/lib/data";
import { computeRiskLevel } from "@/lib/prerequisite";
import { useLang } from "./LanguageProvider";
import { OfferedBadge } from "./CourseBadge";

export function CourseDetailView({ course }: { course: Course }) {
  const { t, courseName, courseSub } = useLang();
  const style = CATEGORY_STYLES[course.category];
  const risk = computeRiskLevel(course.id);
  const dependents = getDependents(course.id);
  const prereqIds = Array.from(
    new Set(course.prerequisites.flatMap((p) => p.courses ?? [])),
  );

  return (
    <div className="container-page py-8">
      <Link href="/courses" className="text-sm text-slate-500 hover:text-slate-700">
        ← {t("common.back")}
      </Link>

      <header className={`mt-4 rounded-2xl p-6 text-white ${style.color}`}>
        <p className="font-mono text-sm opacity-90">{course.code}</p>
        <h1 className="mt-1 text-3xl font-semibold">{courseName(course)}</h1>
        <p className="text-base opacity-90">{courseSub(course)}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          <span className="rounded-full bg-white/15 px-3 py-1">
            {course.creditStructure ?? `${course.credits} ${t("common.credits")}`}
          </span>
          <span className="rounded-full bg-white/15 px-3 py-1">{style.label}</span>
          {course.year && course.semester && (
            <span className="rounded-full bg-white/15 px-3 py-1">
              {t("common.year")} {course.year} / {t("common.semester")} {course.semester}
            </span>
          )}
        </div>
        {course.offered && (
          <div className="mt-3">
            <OfferedBadge status={course.offered} term={course.offeredTerm} />
          </div>
        )}
      </header>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <section className="card p-5">
            <h2 className="text-sm font-semibold text-navy-900 flex items-center gap-2">
              <ArrowLeft className="h-4 w-4 text-cyan-600" /> {t("drawer.prereqs")}
            </h2>
            {prereqIds.length === 0 ? (
              <p className="mt-2 text-sm text-slate-500">{t("drawer.noPrereq")}</p>
            ) : (
              <ul className="mt-3 space-y-2">
                {prereqIds.map((id) => {
                  const c = getCourse(id);
                  return (
                    <li key={id} className="rounded-lg border border-slate-200 p-3">
                      {c ? (
                        <Link href={`/courses/${c.id}`} className="block hover:bg-slate-50">
                          <p className="font-mono text-[11px] text-slate-500">{c.code}</p>
                          <p className="font-medium text-navy-900">{courseName(c)}</p>
                        </Link>
                      ) : (
                        <p className="text-slate-500">{id}</p>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
            {course.prerequisites.some((p) => p.note) && (
              <ul className="mt-3 text-xs text-amber-700 space-y-1">
                {course.prerequisites
                  .filter((p) => p.note)
                  .map((p, i) => (
                    <li key={i}>{p.note}</li>
                  ))}
              </ul>
            )}
          </section>

          <section className="card p-5">
            <h2 className="text-sm font-semibold text-navy-900 flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-fuchsia-600" /> {t("drawer.dependents")}
            </h2>
            {dependents.length === 0 ? (
              <p className="mt-2 text-sm text-slate-500">{t("drawer.noDependents")}</p>
            ) : (
              <ul className="mt-3 grid sm:grid-cols-2 gap-2">
                {dependents.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={`/courses/${c.id}`}
                      className="block rounded-lg border border-slate-200 p-3 hover:bg-slate-50"
                    >
                      <p className="font-mono text-[11px] text-slate-500">{c.code}</p>
                      <p className="text-sm text-navy-900">{courseName(c)}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <aside className="space-y-4">
          <section className="card p-5">
            <h3 className="text-sm font-semibold text-navy-900">{t("prereq.riskLevel")}</h3>
            <div className="mt-2">
              <span className={`badge ${RISK_STYLES[risk].chip}`}>{RISK_STYLES[risk].label}</span>
            </div>
            {course.riskReason && (
              <p className="mt-2 text-sm text-slate-600">{course.riskReason}</p>
            )}
          </section>

          {course.needsVerification && (
            <section className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 flex gap-2">
              <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
              {t("common.needsVerify")}
            </section>
          )}

          {(course.instructor || course.offeredNote) && (
            <section className="card p-5 text-sm space-y-1">
              {course.instructor && (
                <p>
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

          <section className="card p-5 text-xs text-slate-500 space-y-2">
            <p className="font-semibold text-slate-700">{t("electives.source")}</p>
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
            <p className="mt-2 pt-2 border-t border-slate-200 dark:border-navy-700 text-slate-400">
              {t("drawer.disclaimer")}
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
