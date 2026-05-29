"use client";

import type { Course } from "@/lib/types";
import { CATEGORY_STYLES } from "@/lib/types";
import { CategoryBadge, CreditBadge, PrereqBadge, RiskBadge, VerifyNote } from "./CourseBadge";
import { useLang } from "./LanguageProvider";

export function CourseCard({
  course,
  onClick,
  compact = false,
}: {
  course: Course;
  onClick?: (c: Course) => void;
  compact?: boolean;
}) {
  const s = CATEGORY_STYLES[course.category];
  const prereqCount = course.prerequisites.filter((p) => p.type !== "none").length;
  const { courseName, courseSub } = useLang();

  return (
    <button
      type="button"
      onClick={() => onClick?.(course)}
      className={`group text-left card relative overflow-hidden p-4 w-full transition hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
        compact ? "min-h-[88px]" : "min-h-[140px]"
      }`}
    >
      <span className={`absolute inset-y-0 left-0 w-1.5 ${s.color}`} aria-hidden />
      <div className="pl-2">
        <div className="flex items-start justify-between gap-2">
          <p className="font-mono text-[11px] tracking-wide text-slate-500 dark:text-slate-400">
            {course.code}
          </p>
          <CategoryBadge category={course.category} />
        </div>
        <h3 className="mt-1 font-medium leading-snug text-navy-900 line-clamp-2 dark:text-slate-100">
          {courseName(course)}
        </h3>
        {!compact && (
          <p className="mt-0.5 text-xs text-slate-500 line-clamp-2 dark:text-slate-400">
            {courseSub(course)}
          </p>
        )}

        <div className="mt-3 flex flex-wrap gap-1.5">
          <CreditBadge credits={course.credits} structure={course.creditStructure} />
          {!compact && <PrereqBadge count={prereqCount} />}
          {course.riskLevel && course.riskLevel !== "low" && (
            <RiskBadge level={course.riskLevel} />
          )}
          {course.needsVerification && <VerifyNote />}
        </div>
      </div>
    </button>
  );
}
