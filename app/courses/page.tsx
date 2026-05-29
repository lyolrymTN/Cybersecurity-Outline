"use client";

import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import { Search, Filter } from "lucide-react";
import { courses } from "@/lib/data";
import type { Course, CourseCategory } from "@/lib/types";
import { CourseCard } from "@/components/CourseCard";
import { CourseDetailDrawer } from "@/components/CourseDetailDrawer";
import { useLang } from "@/components/LanguageProvider";

const CATS: { id: CourseCategory | "all"; label: string }[] = [
  { id: "all", label: "ทั้งหมด" },
  { id: "core", label: "Core" },
  { id: "gened", label: "Gen-Ed" },
  { id: "math", label: "Math & Sci" },
  { id: "elective", label: "Elective" },
  { id: "free", label: "Free Elective" },
];

export default function CoursesPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<CourseCategory | "all">("all");
  const [year, setYear] = useState<number | "all">("all");
  const [riskOnly, setRiskOnly] = useState(false);
  const [hasPrereq, setHasPrereq] = useState(false);
  const [selected, setSelected] = useState<Course | null>(null);
  const { t } = useLang();

  const fuse = useMemo(
    () =>
      new Fuse(courses, {
        keys: ["code", "thaiName", "englishName", "id"],
        threshold: 0.4,
      }),
    [],
  );

  const filtered = useMemo(() => {
    let list = q.trim()
      ? fuse.search(q).map((r) => r.item)
      : courses;
    if (cat !== "all") list = list.filter((c) => c.category === cat);
    if (year !== "all") list = list.filter((c) => c.year === year);
    if (riskOnly) list = list.filter((c) => c.riskLevel && c.riskLevel !== "low");
    if (hasPrereq)
      list = list.filter((c) => c.prerequisites.some((p) => p.type !== "none"));
    return list;
  }, [q, cat, year, riskOnly, hasPrereq, fuse]);

  return (
    <div className="container-page py-8">
      <header className="mb-6">
        <p className="text-xs uppercase tracking-widest text-cyan-700">
          {t("catalog.kicker")}
        </p>
        <h1 className="mt-1 text-3xl font-semibold text-navy-900">
          {t("catalog.title")}
        </h1>
        <p className="mt-2 text-slate-600">
          {t("catalog.subtitle")} — {t("catalog.showing")} {courses.length}{" "}
          {t("catalog.total")}
        </p>
      </header>

      <div className="card p-4 md:p-5 grid gap-3 md:grid-cols-[1fr_auto]">
        <label className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("catalog.placeholder")}
            className="w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 py-2.5 text-sm focus:border-cyan-400 focus:outline-none"
          />
        </label>
        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
          <Filter className="h-4 w-4" />
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value as any)}
            className="rounded-md border border-slate-200 px-2 py-1.5 text-sm"
          >
            {CATS.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
          <select
            value={year}
            onChange={(e) =>
              setYear(e.target.value === "all" ? "all" : Number(e.target.value))
            }
            className="rounded-md border border-slate-200 px-2 py-1.5 text-sm"
          >
            <option value="all">{t("common.allYears")}</option>
            <option value={1}>{t("common.year")} 1</option>
            <option value={2}>{t("common.year")} 2</option>
            <option value={3}>{t("common.year")} 3</option>
            <option value={4}>{t("common.year")} 4</option>
          </select>
          <label className="inline-flex items-center gap-1.5">
            <input
              type="checkbox"
              checked={hasPrereq}
              onChange={(e) => setHasPrereq(e.target.checked)}
            />
            {t("common.hasPrereq")}
          </label>
          <label className="inline-flex items-center gap-1.5">
            <input
              type="checkbox"
              checked={riskOnly}
              onChange={(e) => setRiskOnly(e.target.checked)}
            />
            {t("common.onlyRisky")}
          </label>
        </div>
      </div>

      <p className="mt-4 text-sm text-slate-500">
        {t("catalog.found")} {filtered.length} {t("catalog.coursesCount")}
      </p>

      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((c) => (
          <CourseCard key={c.id} course={c} onClick={(co) => setSelected(co)} />
        ))}
        {filtered.length === 0 && (
          <div className="card col-span-full p-10 text-center text-slate-500">
            {t("common.noResults")}
          </div>
        )}
      </div>

      <CourseDetailDrawer
        course={selected}
        onClose={() => setSelected(null)}
        onSelect={(id) => {
          const c = courses.find((x) => x.id === id);
          if (c) setSelected(c);
        }}
      />
    </div>
  );
}
