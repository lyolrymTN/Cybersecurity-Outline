"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AlertTriangle, BookOpen, CheckCircle2, FileText, Filter, X } from "lucide-react";
import {
  ELECTIVE_SUBGROUP_ORDER,
  OFFICIAL_PDF_URL,
  getElectivesBySubgroup,
  type ElectiveSubgroup,
} from "@/lib/data";
import type { Course, OfferedStatus } from "@/lib/types";
import { OFFERED_STYLES } from "@/lib/types";
import { CourseDetailDrawer } from "@/components/CourseDetailDrawer";
import { OfferedBadge, CreditBadge } from "@/components/CourseBadge";
import { useLang } from "@/components/LanguageProvider";

const STORAGE_KEY = "cy-electives-selected";
const TARGET_CREDITS = 21;

type TermFilter = "all" | "y3s1" | "y3s2";

export default function ElectivesPage() {
  const { t, locale, courseName, courseSub } = useLang();
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [activeSubgroup, setActiveSubgroup] = useState<ElectiveSubgroup | "all">(
    "all",
  );
  const [termFilter, setTermFilter] = useState<TermFilter>("all");
  const [openOnly, setOpenOnly] = useState(false);
  const [drawerCourse, setDrawerCourse] = useState<Course | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setSelectedIds(new Set(JSON.parse(raw)));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(Array.from(selectedIds)),
      );
    } catch {}
  }, [selectedIds]);

  const groups = useMemo(() => {
    const subgroups =
      activeSubgroup === "all" ? ELECTIVE_SUBGROUP_ORDER : [activeSubgroup];
    return subgroups.map((sg) => ({
      id: sg,
      courses: getElectivesBySubgroup(sg).filter((c) => {
        if (openOnly && c.offered !== "open" && c.offered !== "always") return false;
        if (termFilter === "y3s1" && !isOpenInTerm(c, "1/2568")) return false;
        if (termFilter === "y3s2" && !isOpenInTerm(c, "2/2568")) return false;
        return true;
      }),
    }));
  }, [activeSubgroup, openOnly, termFilter]);

  const allSelected = useMemo(() => {
    return ELECTIVE_SUBGROUP_ORDER.flatMap((sg) =>
      getElectivesBySubgroup(sg),
    ).filter((c) => selectedIds.has(c.id));
  }, [selectedIds]);

  const totalSelectedCredits = allSelected.reduce(
    (sum, c) => sum + c.credits,
    0,
  );
  const progressPct = Math.min(100, (totalSelectedCredits / TARGET_CREDITS) * 100);

  function toggle(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function clearAll() {
    setSelectedIds(new Set());
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 max-w-[1600px] mx-auto">
      <header className="mb-6">
        <p className="text-xs uppercase tracking-widest text-cyan-700 dark:text-cyan-300">
          {t("electives.kicker")}
        </p>
        <h1 className="mt-1 text-3xl font-semibold text-navy-900 dark:text-slate-100">
          {t("electives.title")}
        </h1>
        <p className="mt-2 max-w-3xl text-slate-600 dark:text-slate-300">
          {t("electives.desc")}
        </p>
      </header>

      {/* Running total */}
      <section className="card p-4 sticky top-2 z-10 backdrop-blur bg-white/95 dark:bg-navy-900/95">
        <div className="flex flex-wrap items-center gap-4 justify-between">
          <div className="flex items-center gap-6 flex-wrap">
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t("electives.selectedCount")}
              </p>
              <p className="text-2xl font-semibold text-navy-900 dark:text-slate-100">
                {allSelected.length}{" "}
                <span className="text-sm font-normal text-slate-500">
                  / {t("common.subjects")}
                </span>
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t("electives.creditsTotal")}
              </p>
              <p className="text-2xl font-semibold text-cyan-700 dark:text-cyan-300">
                {totalSelectedCredits}{" "}
                <span className="text-sm font-normal text-slate-500">
                  / {TARGET_CREDITS} {t("common.credits")}
                </span>
              </p>
            </div>
            <div className="flex-1 min-w-[180px] max-w-[320px]">
              <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-navy-800 overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    totalSelectedCredits >= TARGET_CREDITS
                      ? "bg-emerald-500"
                      : "bg-cyan-500"
                  }`}
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                {t("electives.target")}
              </p>
            </div>
          </div>
          {allSelected.length > 0 && (
            <button
              onClick={clearAll}
              className="text-sm text-slate-500 hover:text-rose-600 inline-flex items-center gap-1"
            >
              <X className="h-4 w-4" /> {t("electives.clear")}
            </button>
          )}
        </div>
      </section>

      {/* Filters */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
          <Filter className="h-3.5 w-3.5" /> {t("common.filter")}:
        </span>
        <TermTab id="all" current={termFilter} setCurrent={setTermFilter}>
          {t("electives.tabAll")}
        </TermTab>
        <TermTab id="y3s1" current={termFilter} setCurrent={setTermFilter}>
          {t("electives.tabY3S1")}
        </TermTab>
        <TermTab id="y3s2" current={termFilter} setCurrent={setTermFilter}>
          {t("electives.tabY3S2")}
        </TermTab>

        <span className="mx-2 h-4 w-px bg-slate-200 dark:bg-navy-700" />

        <button
          onClick={() => setActiveSubgroup("all")}
          className={`text-xs px-3 py-1.5 rounded-full border ${
            activeSubgroup === "all"
              ? "border-cyan-500 bg-cyan-50 text-cyan-700 dark:border-cyan-400 dark:bg-cyan-500/10 dark:text-cyan-200"
              : "border-slate-200 bg-white text-slate-600 dark:border-navy-700 dark:bg-navy-900 dark:text-slate-300"
          }`}
        >
          {t("electives.filter.allSubgroups")}
        </button>
        {ELECTIVE_SUBGROUP_ORDER.map((sg) => (
          <button
            key={sg}
            onClick={() => setActiveSubgroup(sg)}
            className={`text-xs px-3 py-1.5 rounded-full border ${
              activeSubgroup === sg
                ? "border-cyan-500 bg-cyan-50 text-cyan-700 dark:border-cyan-400 dark:bg-cyan-500/10 dark:text-cyan-200"
                : "border-slate-200 bg-white text-slate-600 dark:border-navy-700 dark:bg-navy-900 dark:text-slate-300"
            }`}
          >
            {t(`electives.subgroup.${sg}`)}
          </button>
        ))}

        <span className="mx-2 h-4 w-px bg-slate-200 dark:bg-navy-700" />

        <label className="inline-flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={openOnly}
            onChange={(e) => setOpenOnly(e.target.checked)}
            className="rounded"
          />
          {t("electives.filter.openOnly")}
        </label>
      </div>

      {/* Status legend */}
      <div className="mt-4 card p-3">
        <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 mb-2">
          {t("electives.status.title")}
        </p>
        <div className="flex flex-wrap gap-3 text-xs text-slate-600 dark:text-slate-300">
          {(["open", "tba", "always", "closed"] as OfferedStatus[]).map((s) => {
            const st = OFFERED_STYLES[s];
            return (
              <span key={s} className="inline-flex items-center gap-1.5">
                <span className={`h-2 w-2 rounded-full ${st.dot}`} />
                {locale === "en" ? st.labelEn : st.labelTh}
              </span>
            );
          })}
        </div>
      </div>

      {/* Subgroup sections */}
      <div className="mt-6 space-y-8">
        {groups.map((g) => (
          <section key={g.id}>
            <h2 className="text-base font-semibold text-navy-900 dark:text-slate-100">
              {t(`electives.subgroup.${g.id}`)}
            </h2>
            {g.courses.length === 0 ? (
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                {t("electives.empty")}
              </p>
            ) : (
              <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {g.courses.map((c) => (
                  <ElectiveCard
                    key={c.id}
                    course={c}
                    selected={selectedIds.has(c.id)}
                    onToggle={() => toggle(c.id)}
                    onOpenDetail={() => setDrawerCourse(c)}
                  />
                ))}
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Source */}
      <section className="mt-10 card p-5 text-sm text-slate-600 dark:text-slate-300">
        <p className="flex items-start gap-2">
          <FileText className="h-4 w-4 mt-0.5 shrink-0 text-cyan-600 dark:text-cyan-400" />
          <span>
            <span className="font-semibold text-navy-900 dark:text-slate-100">
              {t("electives.source")}:
            </span>{" "}
            ข้อมูลรายวิชา / เงื่อนไขของรายวิชา ในหน้านี้สรุปจากเอกสาร{" "}
            <a
              href={OFFICIAL_PDF_URL}
              target="_blank"
              rel="noreferrer"
              className="text-cyan-700 dark:text-cyan-300 underline"
            >
              {t("source.officialPdf")}
            </a>
            {" "}— โปรดตรวจสอบกับประกาศของหลักสูตรอีกครั้งก่อนลงทะเบียน
          </span>
        </p>
      </section>

      <section className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 flex gap-2 dark:bg-amber-500/10 dark:border-amber-500/40 dark:text-amber-200">
        <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
        <p>
          สถานะ &quot;เปิดสอน / ยังไม่เปิด&quot; อ้างอิงจากตารางวิชาที่เปิดในปีการศึกษา 2568 ที่นักศึกษาแนบมา รายวิชาที่อยู่ในหลักสูตรแต่ไม่ได้เปิดในเทอมนี้ จะแสดงเป็น &quot;ยังไม่เปิด&quot; รอเปิดในเทอม/ปีถัดไป
        </p>
      </section>

      <CourseDetailDrawer
        course={drawerCourse}
        onClose={() => setDrawerCourse(null)}
        onSelect={(id) => {
          const c = ELECTIVE_SUBGROUP_ORDER.flatMap((sg) =>
            getElectivesBySubgroup(sg),
          ).find((x) => x.id === id);
          if (c) setDrawerCourse(c);
        }}
      />
    </div>
  );
}

function isOpenInTerm(c: Course, term: string): boolean {
  if (c.offered === "always") return true;
  if (c.offered !== "open") return false;
  return (c.offeredTerm ?? "").includes(term);
}

function TermTab({
  id,
  current,
  setCurrent,
  children,
}: {
  id: TermFilter;
  current: TermFilter;
  setCurrent: (v: TermFilter) => void;
  children: React.ReactNode;
}) {
  const active = current === id;
  return (
    <button
      onClick={() => setCurrent(id)}
      className={`text-xs px-3 py-1.5 rounded-full border ${
        active
          ? "border-fuchsia-500 bg-fuchsia-50 text-fuchsia-700 dark:border-fuchsia-400 dark:bg-fuchsia-500/10 dark:text-fuchsia-200"
          : "border-slate-200 bg-white text-slate-600 dark:border-navy-700 dark:bg-navy-900 dark:text-slate-300"
      }`}
    >
      {children}
    </button>
  );
}

function ElectiveCard({
  course,
  selected,
  onToggle,
  onOpenDetail,
}: {
  course: Course;
  selected: boolean;
  onToggle: () => void;
  onOpenDetail: () => void;
}) {
  const { t, locale, courseName, courseSub } = useLang();
  const isOpen = course.offered === "open" || course.offered === "always";
  const isClosed = course.offered === "closed";
  const isTba = course.offered === "tba";
  const isOffline = course.offered === undefined;
  const prereq = course.prerequisites.find((p) => p.type !== "none");
  return (
    <div
      className={`relative card p-4 transition ${
        selected
          ? "ring-2 ring-cyan-500 shadow-lg"
          : "hover:-translate-y-0.5 hover:shadow-md"
      } ${isClosed ? "opacity-70" : ""}`}
    >
      {/* Status accent stripe */}
      {course.offered && (
        <span
          className={`absolute inset-y-0 left-0 w-1 ${OFFERED_STYLES[course.offered].dot}`}
          aria-hidden
        />
      )}

      <div className="pl-2">
        <div className="flex items-start justify-between gap-2">
          <p className="font-mono text-[11px] tracking-wide text-slate-500 dark:text-slate-400">
            {course.code}
          </p>
          {course.offered && (
            <OfferedBadge status={course.offered} term={course.offeredTerm} />
          )}
        </div>

        <button
          type="button"
          onClick={onOpenDetail}
          className="mt-1 text-left w-full"
        >
          <h3 className="font-medium leading-snug text-navy-900 dark:text-slate-100 line-clamp-2 group-hover:text-cyan-700">
            {courseName(course)}
          </h3>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
            {courseSub(course)}
          </p>
        </button>

        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <CreditBadge credits={course.credits} structure={course.creditStructure} />
          {prereq && (
            <span className="badge border-cyan-200 bg-cyan-50 text-cyan-700 dark:border-cyan-500/40 dark:bg-cyan-500/10 dark:text-cyan-200">
              {t("electives.prereqInfo")}
            </span>
          )}
        </div>

        {prereq && (
          <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
            <span className="font-semibold">{t("electives.prereqInfo")}:</span>{" "}
            {prereq.textOriginal}
          </p>
        )}

        {course.instructor && (
          <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
            <span className="font-semibold">{t("electives.instructor")}:</span>{" "}
            {course.instructor}
          </p>
        )}

        {course.offeredNote && (
          <p className="mt-1 text-[11px] text-amber-700 dark:text-amber-300">
            {course.offeredNote}
          </p>
        )}

        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={onToggle}
            disabled={isClosed}
            className={`flex-1 text-xs px-3 py-1.5 rounded-md font-medium transition ${
              selected
                ? "bg-cyan-600 text-white hover:bg-cyan-700"
                : isClosed
                ? "bg-slate-100 text-slate-400 dark:bg-navy-800 dark:text-slate-500 cursor-not-allowed"
                : "bg-slate-100 text-slate-700 hover:bg-cyan-50 hover:text-cyan-700 dark:bg-navy-800 dark:text-slate-200 dark:hover:bg-cyan-500/10"
            }`}
          >
            {selected ? (
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" />{" "}
                {locale === "en" ? "Selected" : "เลือกแล้ว"}
              </span>
            ) : isClosed ? (
              locale === "en" ? "Not offered" : "ยังไม่เปิด"
            ) : (
              locale === "en" ? "Add to plan" : "เลือกวิชานี้"
            )}
          </button>
          <button
            onClick={onOpenDetail}
            className="text-xs px-2 py-1.5 rounded-md border border-slate-200 text-slate-600 hover:text-cyan-700 hover:border-cyan-200 dark:border-navy-700 dark:text-slate-300"
            aria-label="Detail"
          >
            <BookOpen className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
