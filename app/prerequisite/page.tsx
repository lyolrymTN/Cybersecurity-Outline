"use client";

import { useMemo, useState } from "react";
import { courses, getCourse, getDependents } from "@/lib/data";
import {
  canEnroll,
  getBlockedCoursesByFailing,
  computeRiskLevel,
} from "@/lib/prerequisite";
import type { Course } from "@/lib/types";
import { CourseCard } from "@/components/CourseCard";
import { CategoryBadge } from "@/components/CourseBadge";
import { CheckCircle2, AlertTriangle, XCircle, BadgeInfo } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";

type Bucket = "passed" | "failed" | "none";

export default function PrerequisitePage() {
  const [state, setState] = useState<Record<string, Bucket>>({});
  const { t, courseName } = useLang();
  const setBucket = (id: string, b: Bucket) =>
    setState((s) => ({ ...s, [id]: b }));

  const passed = useMemo(
    () => new Set(Object.entries(state).filter(([, v]) => v === "passed").map(([k]) => k)),
    [state],
  );
  const failed = useMemo(
    () => new Set(Object.entries(state).filter(([, v]) => v === "failed").map(([k]) => k)),
    [state],
  );

  const eligibility = useMemo(() => {
    return courses.map((c) => {
      const result = canEnroll(c.id, passed, failed);
      return { course: c, result };
    });
  }, [passed, failed]);

  const canTake = eligibility.filter(
    (e) => e.result.status === "ok" && !passed.has(e.course.id) && !failed.has(e.course.id),
  );
  const blocked = eligibility.filter(
    (e) => e.result.status === "blocked",
  );
  const warning = eligibility.filter(
    (e) => e.result.status === "warning",
  );

  const ripple = useMemo(() => {
    const out: { source: Course; affects: Course[] }[] = [];
    for (const fid of failed) {
      const src = getCourse(fid);
      if (!src) continue;
      out.push({ source: src, affects: getBlockedCoursesByFailing(fid) });
    }
    return out;
  }, [failed]);

  return (
    <div className="container-page py-8">
      <header className="mb-6">
        <p className="text-xs uppercase tracking-widest text-cyan-700">
          {t("prereq.kicker")}
        </p>
        <h1 className="mt-1 text-3xl font-semibold text-navy-900">
          {t("prereq.title")}
        </h1>
        <p className="mt-2 max-w-3xl text-slate-600">{t("prereq.desc")}</p>
      </header>

      <div className="grid lg:grid-cols-[1fr_360px] gap-6">
        {/* Course selection */}
        <section className="card p-4 md:p-5">
          <h2 className="text-sm font-semibold text-navy-900">{t("prereq.choose")}</h2>
          <p className="text-xs text-slate-500">{t("prereq.chooseHint")}</p>
          <div className="mt-4 space-y-2 max-h-[640px] overflow-y-auto scroll-fade pr-1">
            {courses.map((c) => {
              const b = state[c.id] ?? "none";
              return (
                <div
                  key={c.id}
                  className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 px-3 py-2"
                >
                  <div className="min-w-0">
                    <p className="font-mono text-[11px] text-slate-500">{c.code}</p>
                    <p className="text-sm font-medium text-navy-900 truncate">
                      {courseName(c)}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <BtnB active={b === "passed"} onClick={() => setBucket(c.id, "passed")}>
                      {t("prereq.passed")}
                    </BtnB>
                    <BtnB
                      active={b === "failed"}
                      onClick={() => setBucket(c.id, "failed")}
                      danger
                    >
                      {t("prereq.failed")}
                    </BtnB>
                    <BtnB active={b === "none"} onClick={() => setBucket(c.id, "none")}>
                      —
                    </BtnB>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Results */}
        <aside className="space-y-4">
          <ResultBlock
            color="emerald"
            icon={<CheckCircle2 className="h-4 w-4" />}
            title={t("prereq.canTake")}
            count={canTake.length}
          >
            <ul className="text-sm space-y-1.5 max-h-44 overflow-y-auto scroll-fade pr-1">
              {canTake.map(({ course }) => (
                <li key={course.id} className="flex items-center justify-between gap-2">
                  <span className="truncate">{course.code} · {course.thaiName}</span>
                  <CategoryBadge category={course.category} />
                </li>
              ))}
              {canTake.length === 0 && <li className="text-slate-500">—</li>}
            </ul>
          </ResultBlock>

          <ResultBlock
            color="amber"
            icon={<AlertTriangle className="h-4 w-4" />}
            title={t("prereq.warning")}
            count={warning.length}
          >
            <ul className="text-sm space-y-1.5 max-h-44 overflow-y-auto scroll-fade pr-1">
              {warning.slice(0, 30).map(({ course, result }) => (
                <li key={course.id}>
                  <p className="font-medium text-amber-900">
                    {course.code} · {course.thaiName}
                  </p>
                  <p className="text-xs text-amber-700">
                    {result.notes[0] ?? "ยังขาด prerequisite"}
                  </p>
                </li>
              ))}
              {warning.length === 0 && <li className="text-slate-500">—</li>}
            </ul>
          </ResultBlock>

          <ResultBlock
            color="red"
            icon={<XCircle className="h-4 w-4" />}
            title={t("prereq.blocked")}
            count={blocked.length}
          >
            <ul className="text-sm space-y-1.5 max-h-44 overflow-y-auto scroll-fade pr-1">
              {blocked.map(({ course, result }) => (
                <li key={course.id}>
                  <p className="font-medium text-red-900">
                    {course.code} · {course.thaiName}
                  </p>
                  <p className="text-xs text-red-700">{result.notes.join(" · ")}</p>
                </li>
              ))}
              {blocked.length === 0 && <li className="text-slate-500">—</li>}
            </ul>
          </ResultBlock>
        </aside>
      </div>

      {/* Ripple */}
      {ripple.length > 0 && (
        <section className="mt-8 card p-5">
          <h2 className="text-lg font-semibold text-navy-900 flex items-center gap-2">
            <BadgeInfo className="h-5 w-5 text-cyan-600" />
            {t("prereq.impact")}
          </h2>
          <p className="text-sm text-slate-600 mt-1">{t("prereq.impactDesc")}</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {ripple.map(({ source, affects }) => (
              <div key={source.id} className="rounded-xl border border-red-200 bg-red-50 p-4">
                <p className="font-mono text-[11px] text-red-700">{source.code}</p>
                <p className="font-semibold text-red-900">{courseName(source)}</p>
                <p className="mt-1 text-xs text-red-700">
                  {t("prereq.riskLevel")}: {computeRiskLevel(source.id)}
                </p>
                <div className="mt-3 grid gap-2">
                  {affects.length === 0 && (
                    <p className="text-sm text-slate-600">{t("prereq.noBlockedDirect")}</p>
                  )}
                  {affects.map((c) => (
                    <div key={c.id} className="rounded-lg border border-red-200 bg-white p-2">
                      <p className="font-mono text-[10px] text-slate-500">{c.code}</p>
                      <p className="text-sm text-navy-900">{courseName(c)}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-amber-700">{t("prereq.advisoryNote")}</p>
        </section>
      )}
    </div>
  );
}

function BtnB({
  active,
  onClick,
  danger,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  danger?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`min-w-[44px] rounded-md px-2 py-1 text-xs ${
        active
          ? danger
            ? "bg-red-500 text-white"
            : "bg-emerald-500 text-white"
          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
      }`}
    >
      {children}
    </button>
  );
}

function ResultBlock({
  title,
  count,
  icon,
  color,
  children,
}: {
  title: string;
  count: number;
  icon: React.ReactNode;
  color: "emerald" | "amber" | "red";
  children: React.ReactNode;
}) {
  const map = {
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-800",
    amber: "border-amber-200 bg-amber-50 text-amber-900",
    red: "border-red-200 bg-red-50 text-red-900",
  };
  return (
    <div className={`rounded-2xl border p-4 ${map[color]}`}>
      <div className="flex items-center justify-between">
        <p className="font-semibold flex items-center gap-1.5">
          {icon} {title}
        </p>
        <span className="rounded-full bg-white/70 px-2 py-0.5 text-xs">{count}</span>
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}
