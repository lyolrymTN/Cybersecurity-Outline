"use client";

import { useState } from "react";
import { commonTerms, getTrackPlan, getCourse } from "@/lib/data";
import { CATEGORY_STYLES } from "@/lib/types";
import { CourseDetailDrawer } from "@/components/CourseDetailDrawer";
import type { Course, TrackKey } from "@/lib/types";
import { useLang } from "@/components/LanguageProvider";

type View = "table" | "card" | "timeline";

export default function StudyPlanPage() {
  const [track, setTrack] = useState<TrackKey>("project");
  const [view, setView] = useState<View>("card");
  const [selected, setSelected] = useState<Course | null>(null);
  const { t, courseName, courseSub } = useLang();

  const plan = getTrackPlan(track);
  const allTerms = [...commonTerms, ...plan.terms];

  return (
    <div className="container-page py-8">
      <header className="mb-6">
        <p className="text-xs uppercase tracking-widest text-cyan-700">{t("plan.kicker")}</p>
        <h1 className="mt-1 text-3xl font-semibold text-navy-900">{t("plan.title")}</h1>
        <p className="mt-2 max-w-3xl text-slate-600">{t("plan.desc")}</p>
      </header>

      <div className="card p-4 flex flex-wrap items-center gap-3 mb-4">
        <div className="flex gap-1">
          {(["project", "coop", "wil"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTrack(t)}
              className={`rounded-full px-3 py-1 text-xs ${
                track === t
                  ? "bg-navy-700 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {t === "project" ? "Project" : t === "coop" ? "Co-op" : "WIL"}
            </button>
          ))}
        </div>
        <div className="ml-auto flex gap-1 text-sm">
          {(["card", "table", "timeline"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`rounded-md px-2.5 py-1 text-xs ${
                view === v
                  ? "bg-cyan-500 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {plan.note && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 mb-5">
          <p>{plan.note}</p>
        </div>
      )}

      {view === "table" && (
        <div className="card overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-3 py-2 text-left">{t("plan.col.term")}</th>
                <th className="px-3 py-2 text-left">{t("plan.col.code")}</th>
                <th className="px-3 py-2 text-left">{t("plan.col.name")}</th>
                <th className="px-3 py-2 text-left">{t("plan.col.credits")}</th>
                <th className="px-3 py-2 text-left">{t("plan.col.category")}</th>
              </tr>
            </thead>
            <tbody>
              {allTerms.map((t) =>
                t.courses.map((cid, i) => {
                  const c = getCourse(cid);
                  if (!c) return null;
                  return (
                    <tr
                      key={`${t.year}-${t.semester}-${cid}-${i}`}
                      className="border-t border-slate-100 hover:bg-slate-50 cursor-pointer"
                      onClick={() => setSelected(c)}
                    >
                      <td className="px-3 py-2 whitespace-nowrap">{t.label}</td>
                      <td className="px-3 py-2 font-mono text-xs">{c.code}</td>
                      <td className="px-3 py-2">
                        <p>{courseName(c)}</p>
                        <p className="text-xs text-slate-500">{courseSub(c)}</p>
                      </td>
                      <td className="px-3 py-2">{c.creditStructure ?? c.credits}</td>
                      <td className="px-3 py-2">
                        {CATEGORY_STYLES[c.category].label}
                      </td>
                    </tr>
                  );
                }),
              )}
            </tbody>
          </table>
        </div>
      )}

      {view === "card" && (
        <div className="grid gap-4 md:grid-cols-2">
          {allTerms.map((t, idx) => (
            <div key={idx} className="card overflow-hidden">
              <div className="flex items-baseline justify-between bg-slate-50 px-4 py-3">
                <div>
                  <p className="font-semibold text-navy-900">{t.label}</p>
                  <p className="text-xs text-slate-500">
                    {t.totalCredits} หน่วยกิต · สะสม {t.cumulative ?? "-"}
                  </p>
                </div>
              </div>
              <div className="p-4 space-y-2">
                {t.courses.map((cid) => {
                  const c = getCourse(cid);
                  if (!c) return null;
                  const s = CATEGORY_STYLES[c.category];
                  return (
                    <button
                      key={cid}
                      onClick={() => setSelected(c)}
                      className="w-full text-left flex items-center gap-3 rounded-lg border border-slate-200 px-3 py-2 hover:bg-slate-50"
                    >
                      <span className={`h-9 w-1.5 rounded ${s.color}`} />
                      <div className="min-w-0 flex-1">
                        <p className="font-mono text-[11px] text-slate-500">{c.code}</p>
                        <p className="text-sm font-medium text-navy-900 truncate">
                          {courseName(c)}
                        </p>
                      </div>
                      <p className="font-mono text-xs text-slate-500">
                        {c.creditStructure ?? `${c.credits} หน่วยกิต`}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {view === "timeline" && (
        <div className="relative pl-4">
          <span className="absolute left-1.5 top-1 bottom-1 w-px bg-slate-200" />
          {allTerms.map((t, idx) => (
            <div key={idx} className="relative pl-6 pb-6">
              <span className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-cyan-500 ring-4 ring-cyan-100" />
              <p className="font-semibold text-navy-900">{t.label}</p>
              <p className="text-xs text-slate-500">
                {t.totalCredits} หน่วยกิต · สะสม {t.cumulative ?? "-"}
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {t.courses.map((cid) => {
                  const c = getCourse(cid);
                  if (!c) return null;
                  const s = CATEGORY_STYLES[c.category];
                  return (
                    <button
                      key={cid}
                      onClick={() => setSelected(c)}
                      className={`rounded-md px-2 py-1 text-[11px] text-white ${s.color}`}
                    >
                      {c.code}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
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
