import { courses, courseById, getDependents } from "./data";
import type { Course, RiskLevel } from "./types";

export type EnrollmentStatus =
  | "ok"
  | "blocked"
  | "warning"
  | "missing-prereq";

export type EnrollmentResult = {
  courseId: string;
  status: EnrollmentStatus;
  missingPrerequisites: string[];
  notes: string[];
};

export function canEnroll(
  courseId: string,
  passedCourses: Set<string>,
  failedCourses: Set<string>,
): EnrollmentResult {
  const course = courseById.get(courseId);
  if (!course) {
    return {
      courseId,
      status: "missing-prereq",
      missingPrerequisites: [],
      notes: ["ไม่พบรายวิชาในระบบ"],
    };
  }

  const missing: string[] = [];
  const notes: string[] = [];

  for (const rule of course.prerequisites) {
    if (rule.type === "none") continue;
    if (!rule.courses || rule.courses.length === 0) continue;

    if (rule.type === "or") {
      const anyPassed = rule.courses.some((c) => passedCourses.has(c));
      if (!anyPassed) {
        missing.push(...rule.courses);
        const tail = rule.allowEquivalent ? " หรือวิชาเทียบเท่า" : "";
        notes.push(
          `ต้องผ่านอย่างน้อย 1 ใน: ${rule.courses.join(", ")}${tail} (${rule.textOriginal})`,
        );
      }
    } else {
      for (const reqId of rule.courses) {
        if (!passedCourses.has(reqId)) {
          missing.push(reqId);
          const tail = rule.allowEquivalent ? " (หรือวิชาเทียบเท่า)" : "";
          if (failedCourses.has(reqId)) {
            notes.push(
              `ติด F / ยังไม่ผ่าน ${reqId}${tail} (${rule.textOriginal})`,
            );
          } else {
            notes.push(`ยังไม่ผ่าน ${reqId}${tail} (${rule.textOriginal})`);
          }
        }
      }
    }
    if (rule.note) notes.push(rule.note);
  }

  if (missing.length === 0) {
    return { courseId, status: "ok", missingPrerequisites: [], notes };
  }

  const hasFailed = missing.some((m) => failedCourses.has(m));
  return {
    courseId,
    status: hasFailed ? "blocked" : "warning",
    missingPrerequisites: Array.from(new Set(missing)),
    notes,
  };
}

export function getBlockedCoursesByFailing(failedCourseId: string): Course[] {
  const visited = new Set<string>();
  const queue: string[] = [failedCourseId];
  const blocked: Course[] = [];

  while (queue.length) {
    const cur = queue.shift()!;
    const dependents = getDependents(cur);
    for (const dep of dependents) {
      if (visited.has(dep.id)) continue;
      visited.add(dep.id);
      blocked.push(dep);
      queue.push(dep.id);
    }
  }
  return blocked;
}

export function computeRiskLevel(courseId: string): RiskLevel {
  const c = courseById.get(courseId);
  if (c?.riskLevel) return c.riskLevel;
  const dependents = getDependents(courseId);
  const count = dependents.length;
  if (count === 0) return "low";
  if (count === 1) return "medium";
  if (count <= 3) return "high";
  return "critical";
}

export function totalCreditsOfCourses(ids: string[]): number {
  return ids.reduce((sum, id) => {
    const c = courseById.get(id);
    return sum + (c?.credits ?? 0);
  }, 0);
}

export function findCourseByCodeOrName(query: string): Course | undefined {
  const norm = query.replace(/[\s\-_.]/g, "").toUpperCase();
  return courses.find(
    (c) =>
      c.id.toUpperCase() === norm ||
      c.code.replace(/\s/g, "").toUpperCase() === norm,
  );
}

export function validateData(): { issues: string[]; orphanedRefs: string[] } {
  const issues: string[] = [];
  const orphaned: string[] = [];

  const seen = new Set<string>();
  for (const c of courses) {
    if (seen.has(c.id)) issues.push(`Duplicate course id: ${c.id}`);
    seen.add(c.id);
    for (const r of c.prerequisites) {
      for (const ref of r.courses ?? []) {
        if (!courseById.has(ref)) orphaned.push(`${c.id} -> ${ref}`);
      }
    }
  }
  return { issues, orphanedRefs: orphaned };
}
