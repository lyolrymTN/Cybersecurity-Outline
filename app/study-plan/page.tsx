"use client";

import { useState } from "react";
import { LayoutGrid, List, Table as TableIcon, Bookmark, BookOpen, Clock, AlertCircle } from "lucide-react";
import { commonTerms, getTrackPlan, getCourse } from "@/lib/data";
import { CATEGORY_STYLES } from "@/lib/types";
import { CourseDetailDrawer } from "@/components/CourseDetailDrawer";
import type { Course, TrackKey } from "@/lib/types";
import { useLang } from "@/components/LanguageProvider";

type View = "card" | "timeline" | "table";

export default function StudyPlanPage() {
  const [track, setTrack] = useState<TrackKey>("project");
  const [view, setView] = useState<View>("card");
  const [selected, setSelected] = useState<Course | null>(null);
  const { t, courseName, courseSub } = useLang();

  const plan = getTrackPlan(track);
  const allTerms = [...commonTerms, ...plan.terms];

  return (
    <div className="container-page py-8">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-widest text-cyan-700 dark:text-cyan-400 font-semibold mb-1">
          {t("plan.kicker")}
        </p>
        <h1 className="text-3xl font-bold text-navy-900 dark:text-slate-100">
          {t("plan.title")}
        </h1>
        <p className="mt-2 max-w-3xl text-slate-600 dark:text-slate-400">
          {t("plan.desc")}
        </p>
      </header>

      {/* Toolbar */}
      <div className="card p-2 md:p-3 flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 shadow-sm border-slate-200 dark:border-navy-700">
        
        {/* Track Selector */}
        <div className="flex w-full sm:w-auto p-1 bg-slate-100 dark:bg-navy-950/50 rounded-xl">
          {(["project", "coop", "wil"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTrack(t)}
              className={`flex-1 sm:flex-none px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                track === t
                  ? "bg-white text-cyan-700 shadow-sm dark:bg-navy-800 dark:text-cyan-400"
                  : "text-slate-600 hover:text-navy-900 hover:bg-slate-200/50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-navy-900/50"
              }`}
            >
              {t === "project" ? "Project" : t === "coop" ? "Co-op" : "WIL"}
            </button>
          ))}
        </div>

        {/* View Selector */}
        <div className="flex w-full sm:w-auto p-1 bg-slate-100 dark:bg-navy-950/50 rounded-xl">
          <button
            onClick={() => setView("card")}
            className={`flex flex-1 sm:flex-none items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              view === "card"
                ? "bg-white text-navy-900 shadow-sm dark:bg-navy-800 dark:text-slate-100"
                : "text-slate-600 hover:text-navy-900 hover:bg-slate-200/50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-navy-900/50"
            }`}
          >
            <LayoutGrid className="w-4 h-4" /> <span className="hidden md:inline">การ์ด</span>
          </button>
          <button
            onClick={() => setView("timeline")}
            className={`flex flex-1 sm:flex-none items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              view === "timeline"
                ? "bg-white text-navy-900 shadow-sm dark:bg-navy-800 dark:text-slate-100"
                : "text-slate-600 hover:text-navy-900 hover:bg-slate-200/50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-navy-900/50"
            }`}
          >
            <List className="w-4 h-4" /> <span className="hidden md:inline">ไทม์ไลน์</span>
          </button>
          <button
            onClick={() => setView("table")}
            className={`flex flex-1 sm:flex-none items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              view === "table"
                ? "bg-white text-navy-900 shadow-sm dark:bg-navy-800 dark:text-slate-100"
                : "text-slate-600 hover:text-navy-900 hover:bg-slate-200/50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-navy-900/50"
            }`}
          >
            <TableIcon className="w-4 h-4" /> <span className="hidden md:inline">ตาราง</span>
          </button>
        </div>
      </div>

      {plan.note && (
        <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-sm text-amber-900 mb-8 flex items-start gap-3 shadow-sm dark:bg-amber-900/10 dark:border-amber-900/30 dark:text-amber-400">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-amber-600 dark:text-amber-500" />
          <p className="leading-relaxed">{plan.note}</p>
        </div>
      )}

      {/* TABLE VIEW */}
      {view === "table" && (
        <div className="card overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 dark:bg-navy-900/50 dark:text-slate-300 dark:border-navy-700">
                <tr>
                  <th className="px-5 py-4 w-32">{t("plan.col.term")}</th>
                  <th className="px-5 py-4 w-28">{t("plan.col.code")}</th>
                  <th className="px-5 py-4">{t("plan.col.name")}</th>
                  <th className="px-5 py-4 w-24">{t("plan.col.credits")}</th>
                  <th className="px-5 py-4 w-40">{t("plan.col.category")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-navy-800">
                {allTerms.map((t) =>
                  t.courses.map((cid, i) => {
                    const c = getCourse(cid);
                    if (!c) return null;
                    const isFirstInTerm = i === 0;
                    return (
                      <tr
                        key={`${t.year}-${t.semester}-${cid}-${i}`}
                        className={`hover:bg-cyan-50/50 dark:hover:bg-cyan-900/10 cursor-pointer transition-colors ${
                          isFirstInTerm ? "border-t-2 border-slate-200 dark:border-navy-700" : ""
                        }`}
                        onClick={() => setSelected(c)}
                      >
                        <td className="px-5 py-3 whitespace-nowrap align-top pt-4">
                          {isFirstInTerm && (
                            <span className="inline-flex font-semibold text-navy-900 dark:text-slate-200">
                              {t.label}
                            </span>
                          )}
                        </td>
                        <td className="px-5 py-3 font-mono text-xs text-slate-500 dark:text-slate-400 align-top pt-4">
                          {c.code}
                        </td>
                        <td className="px-5 py-3 align-top pt-3">
                          <p className="font-medium text-navy-900 dark:text-slate-200">{courseName(c)}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{courseSub(c)}</p>
                        </td>
                        <td className="px-5 py-3 font-mono text-xs text-slate-600 dark:text-slate-300 align-top pt-4">
                          {c.creditStructure ?? c.credits}
                        </td>
                        <td className="px-5 py-3 align-top pt-3">
                          <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-medium text-slate-700 dark:bg-navy-800 dark:text-slate-300">
                            {CATEGORY_STYLES[c.category].label}
                          </span>
                        </td>
                      </tr>
                    );
                  }),
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CARD VIEW */}
      {view === "card" && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {allTerms.map((term, idx) => (
            <div key={idx} className="card overflow-hidden flex flex-col hover:shadow-lg transition-shadow border-slate-200 dark:border-navy-700">
              <div className="bg-slate-50 dark:bg-navy-900 px-5 py-4 border-b border-slate-200 dark:border-navy-700 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg text-navy-900 dark:text-white flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                    {term.label}
                  </h3>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
                    {term.totalCredits} หน่วยกิต {term.cumulative ? `· สะสม ${term.cumulative}` : ""}
                  </p>
                </div>
              </div>
              <div className="p-3 flex-1 flex flex-col gap-2 bg-white dark:bg-navy-950/30">
                {term.courses.map((cid) => {
                  const c = getCourse(cid);
                  if (!c) return null;
                  const s = CATEGORY_STYLES[c.category];
                  return (
                    <button
                      key={cid}
                      onClick={() => setSelected(c)}
                      className="group flex items-stretch text-left rounded-lg border border-slate-100 dark:border-navy-800 bg-white dark:bg-navy-900 hover:border-cyan-200 hover:shadow-sm dark:hover:border-cyan-800 transition-all overflow-hidden"
                    >
                      <div className={`w-1.5 shrink-0 ${s.color}`} />
                      <div className="flex-1 p-3 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-mono text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-wider">
                            {c.code}
                          </span>
                          <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-navy-950 px-1.5 py-0.5 rounded">
                            {c.creditStructure ?? c.credits}
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-navy-900 dark:text-slate-200 leading-snug group-hover:text-cyan-700 dark:group-hover:text-cyan-400 transition-colors">
                          {courseName(c)}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TIMELINE VIEW */}
      {view === "timeline" && (
        <div className="max-w-4xl mx-auto py-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="relative pl-6 md:pl-8">
            {/* Main Vertical Line */}
            <div className="absolute left-[11px] md:left-[15px] top-4 bottom-8 w-0.5 bg-gradient-to-b from-cyan-400 via-cyan-200 to-transparent dark:from-cyan-600 dark:via-cyan-800" />
            
            {allTerms.map((term, idx) => (
              <div key={idx} className="relative mb-12">
                {/* Timeline Dot */}
                <div className="absolute -left-[29px] md:-left-[33px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-100 dark:bg-cyan-900/50 ring-4 ring-white dark:ring-navy-950">
                  <div className="h-2.5 w-2.5 rounded-full bg-cyan-500 dark:bg-cyan-400" />
                </div>
                
                {/* Term Header */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-navy-900 dark:text-slate-100 flex items-center gap-2">
                    {term.label}
                  </h3>
                  <div className="flex items-center gap-3 mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {term.totalCredits} หน่วยกิต</span>
                    {term.cumulative && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                        <span className="flex items-center gap-1"><Bookmark className="w-3.5 h-3.5" /> สะสม {term.cumulative}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Courses List */}
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {term.courses.map((cid) => {
                    const c = getCourse(cid);
                    if (!c) return null;
                    const s = CATEGORY_STYLES[c.category];
                    return (
                      <button
                        key={cid}
                        onClick={() => setSelected(c)}
                        className="group flex flex-col text-left p-3 rounded-xl border border-slate-200 bg-white hover:border-cyan-300 hover:shadow-md transition-all dark:bg-navy-900 dark:border-navy-700 dark:hover:border-cyan-700"
                      >
                        <div className="flex justify-between items-start w-full mb-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold text-white ${s.color} shadow-sm`}>
                            {c.code}
                          </span>
                          <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500">
                            {c.creditStructure ?? c.credits}
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-navy-900 dark:text-slate-200 leading-snug group-hover:text-cyan-700 dark:group-hover:text-cyan-400 transition-colors">
                          {courseName(c)}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <CourseDetailDrawer
        course={selected}
        onClose={() => setSelected(null)}
        onSelect={(id) => {
          const c = getCourse(id);
          if (c) setSelected(c);
        }}
      />
    </div>
  );
}
