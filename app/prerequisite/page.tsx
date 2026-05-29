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
import { CheckCircle2, AlertTriangle, XCircle, BadgeInfo, Search, Check, X, Minus, ChevronDown, ChevronRight } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";

type Bucket = "passed" | "failed" | "none";

export default function PrerequisitePage() {
  const [state, setState] = useState<Record<string, Bucket>>({});
  const [q, setQ] = useState("");
  const [expandedYears, setExpandedYears] = useState<Record<string, boolean>>({
    "1": true, "2": false, "3": false, "4": false, "other": false
  });
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

  // Filter courses for selection list
  const filteredCourses = useMemo(() => {
    const query = q.toLowerCase().trim();
    if (!query) return courses;
    return courses.filter(
      c => c.code.toLowerCase().includes(query) || 
           c.thaiName.toLowerCase().includes(query) || 
           c.englishName.toLowerCase().includes(query)
    );
  }, [q]);

  const groupedCourses = useMemo(() => {
    const groups: { [key: string]: Course[] } = {
      "1": [], "2": [], "3": [], "4": [], "other": []
    };
    filteredCourses.forEach(c => {
      if (c.year) {
        groups[c.year.toString()].push(c);
      } else {
        groups["other"].push(c);
      }
    });
    return groups;
  }, [filteredCourses]);

  const toggleYear = (y: string) => {
    setExpandedYears(prev => ({ ...prev, [y]: !prev[y] }));
  };

  const stats = {
    passed: passed.size,
    failed: failed.size,
    canTake: canTake.length,
    blocked: blocked.length
  };

  return (
    <div className="container-page py-8">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-widest text-cyan-700 dark:text-cyan-400">
          {t("prereq.kicker")}
        </p>
        <h1 className="mt-1 text-3xl font-semibold text-navy-900 dark:text-slate-100">
          {t("prereq.title")}
        </h1>
        <p className="mt-2 max-w-3xl text-slate-600 dark:text-slate-400">{t("prereq.desc")}</p>
      </header>

      {/* Summary Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="card p-4 border-l-4 border-l-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/10">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">สอบผ่านแล้ว</p>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{stats.passed}</p>
        </div>
        <div className="card p-4 border-l-4 border-l-red-500 bg-red-50/50 dark:bg-red-900/10">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">สอบตก (F)</p>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.failed}</p>
        </div>
        <div className="card p-4 border-l-4 border-l-cyan-500 bg-cyan-50/50 dark:bg-cyan-900/10">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">วิชาที่ลงทะเบียนได้</p>
          <p className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">{stats.canTake}</p>
        </div>
        <div className="card p-4 border-l-4 border-l-slate-400 bg-slate-50 dark:bg-slate-800/50">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">ติดเงื่อนไข / ลงไม่ได้</p>
          <p className="text-2xl font-bold text-slate-700 dark:text-slate-300">{stats.blocked}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_400px] gap-6 items-start">
        {/* Course selection */}
        <section className="card flex flex-col h-[700px] overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-900/50">
            <h2 className="text-lg font-semibold text-navy-900 dark:text-slate-100">{t("prereq.choose")}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-4">{t("prereq.chooseHint")}</p>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="ค้นหารายวิชา (รหัสวิชา, ชื่อวิชา)..."
                className="w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 py-2 text-sm focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 dark:border-navy-600 dark:bg-navy-950 dark:text-white transition-all"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto scroll-fade p-4 space-y-4 bg-slate-50/50 dark:bg-navy-950/20">
            {Object.entries(groupedCourses).map(([year, coursesInYear]) => {
              if (coursesInYear.length === 0) return null;
              
              const isExpanded = !!expandedYears[year] || q.length > 0; // Auto-expand when searching
              const label = year === "other" ? "วิชาอื่นๆ (ไม่มีชั้นปี)" : `วิชาชั้นปีที่ ${year}`;
              
              return (
                <div key={year} className="space-y-2">
                  <button
                    onClick={() => toggleYear(year)}
                    className="flex w-full items-center justify-between rounded-lg bg-slate-200/50 dark:bg-navy-800/80 px-4 py-2.5 text-sm font-semibold text-navy-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-navy-800 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 px-2 py-0.5 rounded-md text-xs">{coursesInYear.length}</span>
                      {label}
                    </div>
                    {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </button>

                  {isExpanded && (
                    <div className="space-y-2 pl-1 animate-in slide-in-from-top-1 fade-in duration-200">
                      {coursesInYear.map((c) => {
                        const b = state[c.id] ?? "none";
                        return (
                          <div
                            key={c.id}
                            className={`flex flex-col xl:flex-row xl:items-center justify-between gap-3 rounded-xl border p-3 transition-colors ${
                              b === "passed" ? "border-emerald-200 bg-emerald-50 dark:border-emerald-900/50 dark:bg-emerald-900/20" :
                              b === "failed" ? "border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-900/20" :
                              "border-slate-200 bg-white dark:border-navy-700 dark:bg-navy-800 hover:border-cyan-300 dark:hover:border-cyan-700"
                            }`}
                          >
                            <div className="min-w-0 flex-1">
                              <p className="font-mono text-xs font-semibold text-cyan-700 dark:text-cyan-400">{c.code}</p>
                              <p className="text-sm font-medium text-navy-900 dark:text-slate-200 truncate mt-0.5">
                                {courseName(c)}
                              </p>
                            </div>
                            <div className="flex bg-slate-100 dark:bg-navy-900 rounded-lg p-1 self-start xl:self-auto shrink-0 border border-slate-200 dark:border-navy-700">
                              <button
                                onClick={() => setBucket(c.id, "passed")}
                                className={`flex items-center justify-center rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                                  b === "passed"
                                    ? "bg-emerald-500 text-white shadow-sm"
                                    : "text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 dark:text-slate-400 dark:hover:bg-emerald-900/30"
                                }`}
                                title="สอบผ่าน"
                              >
                                <Check className="h-4 w-4 sm:mr-1" />
                                <span className="hidden sm:inline">{t("prereq.passed")}</span>
                              </button>
                              <button
                                onClick={() => setBucket(c.id, "failed")}
                                className={`flex items-center justify-center rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                                  b === "failed"
                                    ? "bg-red-500 text-white shadow-sm"
                                    : "text-slate-600 hover:text-red-600 hover:bg-red-50 dark:text-slate-400 dark:hover:bg-red-900/30"
                                }`}
                                title="สอบตก (F)"
                              >
                                <X className="h-4 w-4 sm:mr-1" />
                                <span className="hidden sm:inline">{t("prereq.failed")}</span>
                              </button>
                              <button
                                onClick={() => setBucket(c.id, "none")}
                                className={`flex items-center justify-center rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                                  b === "none"
                                    ? "bg-white text-slate-800 shadow-sm dark:bg-navy-700 dark:text-white"
                                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 dark:text-slate-400 dark:hover:bg-navy-800"
                                }`}
                                title="ยังไม่เรียน"
                              >
                                <Minus className="h-4 w-4 sm:mr-1" />
                                <span className="hidden sm:inline">ว่าง</span>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
            
            {filteredCourses.length === 0 && (
              <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                ไม่พบวิชาที่ค้นหา
              </div>
            )}
          </div>
        </section>

        {/* Results */}
        <aside className="space-y-4">
          <ResultBlock
            color="emerald"
            icon={<CheckCircle2 className="h-5 w-5" />}
            title={t("prereq.canTake")}
            count={canTake.length}
            maxHeight="max-h-[220px]"
          >
            <ul className="text-sm space-y-2 pr-2">
              {canTake.map(({ course }) => (
                <li key={course.id} className="flex items-start justify-between gap-3 p-2 rounded-md hover:bg-emerald-100/50 dark:hover:bg-emerald-900/20 transition-colors">
                  <div className="min-w-0">
                    <p className="font-mono text-xs text-emerald-700 dark:text-emerald-400">{course.code}</p>
                    <p className="truncate font-medium text-slate-800 dark:text-slate-200">{courseName(course)}</p>
                  </div>
                  <div className="shrink-0 mt-0.5">
                    <CategoryBadge category={course.category} />
                  </div>
                </li>
              ))}
              {canTake.length === 0 && <li className="text-slate-500 text-center py-4">— ไม่มี —</li>}
            </ul>
          </ResultBlock>

          <ResultBlock
            color="amber"
            icon={<AlertTriangle className="h-5 w-5" />}
            title={t("prereq.warning")}
            count={warning.length}
            maxHeight="max-h-[160px]"
          >
            <ul className="text-sm space-y-2 pr-2">
              {warning.slice(0, 30).map(({ course, result }) => (
                <li key={course.id} className="p-2 rounded-md bg-amber-100/30 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/30">
                  <p className="font-medium text-amber-900 dark:text-amber-200 flex items-center gap-2">
                    <span className="font-mono text-xs">{course.code}</span>
                    <span className="truncate">{courseName(course)}</span>
                  </p>
                  <p className="text-xs text-amber-700 dark:text-amber-400 mt-1 line-clamp-2 leading-relaxed">
                    {result.notes[0] ?? "อาจขาด prerequisite บางตัว"}
                  </p>
                </li>
              ))}
              {warning.length === 0 && <li className="text-slate-500 text-center py-2">—</li>}
            </ul>
          </ResultBlock>

          <ResultBlock
            color="red"
            icon={<XCircle className="h-5 w-5" />}
            title={t("prereq.blocked")}
            count={blocked.length}
            maxHeight="max-h-[160px]"
          >
            <ul className="text-sm space-y-2 pr-2">
              {blocked.map(({ course, result }) => (
                <li key={course.id} className="p-2 rounded-md bg-red-100/30 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30">
                  <p className="font-medium text-red-900 dark:text-red-200 flex items-center gap-2">
                    <span className="font-mono text-xs">{course.code}</span>
                    <span className="truncate">{courseName(course)}</span>
                  </p>
                  <p className="text-xs text-red-700 dark:text-red-400 mt-1 line-clamp-2 leading-relaxed">
                    {result.notes.join(" · ")}
                  </p>
                </li>
              ))}
              {blocked.length === 0 && <li className="text-slate-500 text-center py-2">—</li>}
            </ul>
          </ResultBlock>
        </aside>
      </div>

      {/* Ripple */}
      {ripple.length > 0 && (
        <section className="mt-8 card p-6 border-red-200 dark:border-red-900/50">
          <div className="flex items-start sm:items-center gap-3 mb-4">
            <div className="p-2 bg-red-100 dark:bg-red-900/50 rounded-lg text-red-600 dark:text-red-400">
              <BadgeInfo className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-navy-900 dark:text-slate-100">
                {t("prereq.impact")}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{t("prereq.impactDesc")}</p>
            </div>
          </div>
          
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {ripple.map(({ source, affects }) => (
              <div key={source.id} className="rounded-xl border border-red-200 bg-red-50/50 p-4 dark:bg-red-950/20 dark:border-red-900/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-10">
                  <AlertTriangle className="h-16 w-16 text-red-500" />
                </div>
                
                <p className="font-mono text-xs font-bold text-red-700 dark:text-red-400">{source.code}</p>
                <p className="font-semibold text-red-900 dark:text-red-200 mt-1">{courseName(source)}</p>
                
                <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border border-red-200 bg-white text-red-700 dark:bg-red-900/40 dark:border-red-800 dark:text-red-300">
                  {t("prereq.riskLevel")}: {computeRiskLevel(source.id)}
                </div>
                
                <div className="mt-4 pt-4 border-t border-red-200/50 dark:border-red-900/30">
                  <p className="text-xs font-semibold text-red-800 mb-2 dark:text-red-300">วิชาที่ลงทะเบียนต่อไม่ได้:</p>
                  <div className="grid gap-2">
                    {affects.length === 0 && (
                      <p className="text-xs text-slate-500 italic">{t("prereq.noBlockedDirect")}</p>
                    )}
                    {affects.map((c) => (
                      <div key={c.id} className="rounded-lg border border-red-100 bg-white p-2 flex items-center gap-2 dark:bg-navy-900 dark:border-red-900/20">
                        <span className="font-mono text-[10px] bg-red-100 text-red-800 px-1.5 py-0.5 rounded dark:bg-red-900/50 dark:text-red-200">{c.code}</span>
                        <span className="text-xs font-medium text-navy-900 dark:text-slate-200 truncate">{courseName(c)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-amber-700 bg-amber-50 p-3 rounded-lg border border-amber-200 dark:bg-amber-900/10 dark:border-amber-900/30 dark:text-amber-400">
            <strong>หมายเหตุ:</strong> {t("prereq.advisoryNote")}
          </p>
        </section>
      )}
    </div>
  );
}

function ResultBlock({
  title,
  count,
  icon,
  color,
  maxHeight,
  children,
}: {
  title: string;
  count: number;
  icon: React.ReactNode;
  color: "emerald" | "amber" | "red";
  maxHeight: string;
  children: React.ReactNode;
}) {
  const map = {
    emerald: "border-emerald-200 bg-emerald-50/50 text-emerald-800 dark:bg-emerald-900/10 dark:border-emerald-900/30 dark:text-emerald-400",
    amber: "border-amber-200 bg-amber-50/50 text-amber-900 dark:bg-amber-900/10 dark:border-amber-900/30 dark:text-amber-400",
    red: "border-red-200 bg-red-50/50 text-red-900 dark:bg-red-900/10 dark:border-red-900/30 dark:text-red-400",
  };
  const iconBg = {
    emerald: "bg-emerald-200/50 dark:bg-emerald-900/50",
    amber: "bg-amber-200/50 dark:bg-amber-900/50",
    red: "bg-red-200/50 dark:bg-red-900/50",
  };
  
  return (
    <div className={`rounded-2xl border p-5 ${map[color]}`}>
      <div className="flex items-center justify-between border-b border-black/5 pb-3 mb-3 dark:border-white/5">
        <div className="flex items-center gap-2.5 font-semibold">
          <div className={`p-1.5 rounded-lg ${iconBg[color]}`}>{icon}</div>
          <span className="text-lg">{title}</span>
        </div>
        <span className="flex h-7 min-w-[28px] items-center justify-center rounded-full bg-white px-2 text-sm font-bold shadow-sm dark:bg-navy-800 dark:text-white">
          {count}
        </span>
      </div>
      <div className={`overflow-y-auto scroll-fade ${maxHeight}`}>{children}</div>
    </div>
  );
}
