import coursesData from "@/data/courses.json";
import curriculumData from "@/data/curriculum-plan.json";
import tracksData from "@/data/tracks.json";
import outcomesData from "@/data/learning-outcomes.json";
import careersData from "@/data/careers.json";
import type { Course, CurriculumTerm, TrackKey } from "./types";

export const courses: Course[] = coursesData as Course[];

export const courseById = new Map<string, Course>(courses.map((c) => [c.id, c]));

export function getCourse(id: string): Course | undefined {
  return courseById.get(id);
}

export const programInfo = curriculumData.program;

export const commonTerms: CurriculumTerm[] = curriculumData.common as CurriculumTerm[];

export function getTrackPlan(track: TrackKey): {
  label: string;
  terms: CurriculumTerm[];
  note?: string;
  needsVerification?: boolean;
} {
  const plan = (curriculumData.tracks as Record<string, any>)[track];
  return {
    label: plan.label,
    terms: plan.terms as CurriculumTerm[],
    note: plan.note,
    needsVerification: plan.needsVerification,
  };
}

export function getAllTermsForTrack(track: TrackKey): CurriculumTerm[] {
  return [...commonTerms, ...getTrackPlan(track).terms];
}

export const tracks = tracksData as Array<{
  id: TrackKey;
  nameThai: string;
  nameEnglish: string;
  description: string;
  suitableFor: string[];
  requirements: string[];
  requiredCourses: string[];
  electiveCreditsRequired?: number;
  freeElectiveCreditsRequired?: number;
  warnings: string[];
}>;

export const learningOutcomes = outcomesData as {
  note: string;
  needsVerification?: boolean;
  plo: { id: string; label: string }[];
  ylo: Record<string, string>;
};

export const careers = careersData as Array<{
  id: string;
  title: string;
  titleThai: string;
  description: string;
  skills: string[];
  relatedCourses: string[];
  electiveHint: string;
  note?: string;
}>;

export const OFFICIAL_PDF_URL =
  "https://api.computing.kku.ac.th//storage/documents/2025-5-4-1747209830-undefined.pdf";

export const OFFICIAL_COURSES_URL =
  "https://computing.kku.ac.th/cs/cybersecurity#courses";

export type ElectiveSubgroup =
  | "network"
  | "platform"
  | "defense"
  | "policy"
  | "theory"
  | "foundation";

export const ELECTIVE_SUBGROUP_ORDER: ElectiveSubgroup[] = [
  "network",
  "platform",
  "defense",
  "policy",
  "theory",
  "foundation",
];

export function getElectives(): Course[] {
  return courses.filter((c) => c.category === "elective" && c.subgroup);
}

export function getElectivesBySubgroup(
  subgroup: ElectiveSubgroup,
): Course[] {
  return courses.filter(
    (c) => c.category === "elective" && c.subgroup === subgroup,
  );
}

export function normalizeCourseCode(input: string): string {
  return input.replace(/[\s\-_.]/g, "").toUpperCase();
}

export function getDependents(courseId: string): Course[] {
  return courses.filter((c) =>
    c.prerequisites.some((p) => p.courses?.includes(courseId)),
  );
}
