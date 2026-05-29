"use client";

import { useState } from "react";
import { CurriculumFlowDiagram } from "@/components/CurriculumFlowDiagram";
import { CourseDetailDrawer } from "@/components/CourseDetailDrawer";
import { CourseCard } from "@/components/CourseCard";
import type { Course } from "@/lib/types";
import { commonTerms, getTrackPlan, getCourse } from "@/lib/data";
import { Printer, Download, AlertTriangle } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";

export default function CurriculumPage() {
  const [selected, setSelected] = useState<Course | null>(null);
  const { t, courseName } = useLang();

  const projectPlan = getTrackPlan("project");
  const fallbackTerms = [...commonTerms, ...projectPlan.terms];

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-6">
        <p className="text-xs uppercase tracking-widest text-cyan-700">
          {t("curriculum.kicker")}
        </p>
        <h1 className="mt-1 text-3xl font-semibold text-navy-900">
          {t("curriculum.title")}
        </h1>
        <p className="mt-2 max-w-3xl text-slate-600">{t("curriculum.desc")}</p>
      </header>

      <div className="hidden lg:block">
        <CurriculumFlowDiagram onSelect={(c) => setSelected(c)} />
      </div>

      <div className="lg:hidden">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 mb-4 flex gap-2">
          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
          {t("curriculum.mobileHint")}
        </div>
        <div className="space-y-3">
          {fallbackTerms.map((term, idx) => (
            <details
              key={`${term.year}-${term.semester}-${idx}`}
              className="card overflow-hidden"
              open={idx < 2}
            >
              <summary className="cursor-pointer list-none px-4 py-3 flex items-center justify-between bg-slate-50">
                <div>
                  <p className="font-semibold text-navy-900">{term.label}</p>
                  <p className="text-xs text-slate-500">
                    {term.totalCredits} {t("common.credits")} ·{" "}
                    {term.cumulative ?? "-"}
                  </p>
                </div>
              </summary>
              <div className="p-4 grid gap-2">
                {term.courses.map((cid) => {
                  const c = getCourse(cid);
                  if (!c) return null;
                  return (
                    <CourseCard
                      key={cid}
                      course={c}
                      compact
                      onClick={(co) => setSelected(co)}
                    />
                  );
                })}
              </div>
            </details>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2 no-print">
        <button onClick={() => window.print()} className="btn-outline">
          <Printer className="h-4 w-4" /> {t("common.print")}
        </button>
        <button
          onClick={() => {
            const text = fallbackTerms
              .map(
                (t) =>
                  `${t.label} (${t.totalCredits} credits)\n` +
                  t.courses
                    .map((cid) => {
                      const c = getCourse(cid);
                      return c ? `  - ${c.code} ${courseName(c)}` : `  - ${cid}`;
                    })
                    .join("\n"),
              )
              .join("\n\n");
            navigator.clipboard?.writeText(text);
          }}
          className="btn-outline"
        >
          <Download className="h-4 w-4" /> {t("common.copy")}
        </button>
      </div>

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
