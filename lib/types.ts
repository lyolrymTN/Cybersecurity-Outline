import { z } from "zod";

export const CourseCategorySchema = z.enum([
  "gened",
  "math",
  "core",
  "elective",
  "free",
  "lab",
]);
export type CourseCategory = z.infer<typeof CourseCategorySchema>;

export const TrackIdSchema = z.enum([
  "common",
  "project",
  "coop",
  "wil",
  "elective",
  "free-elective",
]);
export type TrackId = z.infer<typeof TrackIdSchema>;

export const RiskLevelSchema = z.enum(["low", "medium", "high", "critical"]);
export type RiskLevel = z.infer<typeof RiskLevelSchema>;

export const PrerequisiteRuleSchema = z.object({
  type: z.enum(["course", "or", "and", "equivalent", "approval", "none"]),
  courses: z.array(z.string()).optional(),
  allowEquivalent: z.boolean().optional(),
  textOriginal: z.string(),
  note: z.string().optional(),
});
export type PrerequisiteRule = z.infer<typeof PrerequisiteRuleSchema>;

export const OfferedStatusSchema = z.enum([
  "open",
  "closed",
  "tba",
  "always",
]);
export type OfferedStatus = z.infer<typeof OfferedStatusSchema>;

export const CourseSchema = z.object({
  id: z.string(),
  code: z.string(),
  thaiName: z.string(),
  englishName: z.string(),
  credits: z.number(),
  creditStructure: z.string().optional(),
  category: CourseCategorySchema,
  subCategory: z.string().optional(),
  year: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]).optional(),
  semester: z.union([z.literal(1), z.literal(2)]).optional(),
  recommendedTerm: z.string().optional(),
  descriptionThai: z.string().optional(),
  descriptionEnglish: z.string().optional(),
  prerequisites: z.array(PrerequisiteRuleSchema),
  corequisites: z.array(z.string()).optional(),
  dependents: z.array(z.string()).optional(),
  track: TrackIdSchema.optional(),
  plo: z.array(z.string()).optional(),
  ylo: z.array(z.string()).optional(),
  clo: z.array(z.string()).optional(),
  riskLevel: RiskLevelSchema.optional(),
  riskReason: z.string().optional(),
  sourcePage: z.number().optional(),
  needsVerification: z.boolean().optional(),
  subgroup: z.string().optional(),
  offered: OfferedStatusSchema.optional(),
  offeredTerm: z.string().optional(),
  offeredNote: z.string().optional(),
  instructor: z.string().optional(),
});
export type Course = z.infer<typeof CourseSchema>;

export const CurriculumTermSchema = z.object({
  year: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]),
  semester: z.union([z.literal(1), z.literal(2)]),
  label: z.string(),
  totalCredits: z.number(),
  cumulative: z.number().optional(),
  courses: z.array(z.string()),
  note: z.string().optional(),
});
export type CurriculumTerm = z.infer<typeof CurriculumTermSchema>;

export type TrackKey = "project" | "coop" | "wil";

export type CategoryStyle = {
  key: CourseCategory;
  label: string;
  color: string;
  border: string;
  text: string;
};

export const CATEGORY_STYLES: Record<CourseCategory, CategoryStyle> = {
  gened: {
    key: "gened",
    label: "Gen-Ed",
    color: "bg-emerald-500",
    border: "border-emerald-600",
    text: "text-emerald-50",
  },
  math: {
    key: "math",
    label: "Math & Science",
    color: "bg-orange-500",
    border: "border-orange-600",
    text: "text-orange-50",
  },
  core: {
    key: "core",
    label: "Core",
    color: "bg-sky-500",
    border: "border-sky-600",
    text: "text-sky-50",
  },
  elective: {
    key: "elective",
    label: "Elective",
    color: "bg-fuchsia-500",
    border: "border-fuchsia-600",
    text: "text-fuchsia-50",
  },
  free: {
    key: "free",
    label: "Free Elective",
    color: "bg-emerald-300",
    border: "border-emerald-400",
    text: "text-emerald-950",
  },
  lab: {
    key: "lab",
    label: "Lab",
    color: "bg-slate-700",
    border: "border-slate-800",
    text: "text-slate-50",
  },
};

export const OFFERED_STYLES: Record<
  OfferedStatus,
  { labelTh: string; labelEn: string; chip: string; dot: string }
> = {
  open: {
    labelTh: "เปิดสอน",
    labelEn: "Open",
    chip: "bg-emerald-50 text-emerald-700 border-emerald-300",
    dot: "bg-emerald-500",
  },
  closed: {
    labelTh: "ยังไม่เปิด",
    labelEn: "Not offered",
    chip: "bg-slate-100 text-slate-600 border-slate-300",
    dot: "bg-slate-400",
  },
  tba: {
    labelTh: "รอประกาศ",
    labelEn: "TBA",
    chip: "bg-amber-50 text-amber-700 border-amber-300",
    dot: "bg-amber-500",
  },
  always: {
    labelTh: "เปิดทุกภาคการศึกษา",
    labelEn: "Every term",
    chip: "bg-cyan-50 text-cyan-700 border-cyan-300",
    dot: "bg-cyan-500",
  },
};

export const RISK_STYLES: Record<RiskLevel, { label: string; chip: string }> = {
  low: { label: "ความเสี่ยงต่ำ", chip: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  medium: { label: "ควรระวัง", chip: "bg-amber-50 text-amber-700 border-amber-200" },
  high: { label: "เสี่ยงสูง", chip: "bg-orange-50 text-orange-700 border-orange-300" },
  critical: { label: "วิกฤต — กระทบแผนเรียน", chip: "bg-red-50 text-red-700 border-red-300" },
};
