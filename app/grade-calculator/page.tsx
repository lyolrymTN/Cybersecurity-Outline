"use client";

import { useState, useMemo } from "react";
import { Calculator, Award, GraduationCap, TrendingUp, Plus, X } from "lucide-react";
import { commonTerms, getTrackPlan, getCourse } from "@/lib/data";
import { CATEGORY_STYLES } from "@/lib/types";
import type { TrackKey } from "@/lib/types";
import { useLang } from "@/components/LanguageProvider";

type GradeValue = "4.0" | "3.5" | "3.0" | "2.5" | "2.0" | "1.5" | "1.0" | "0.0" | "none";

type CustomCourse = {
  id: string;
  termIndex: number;
  name: string;
  credits: number;
  grade: GradeValue;
};

const GRADES = [
  { label: "A (4.0)", value: "4.0" },
  { label: "B+ (3.5)", value: "3.5" },
  { label: "B (3.0)", value: "3.0" },
  { label: "C+ (2.5)", value: "2.5" },
  { label: "C (2.0)", value: "2.0" },
  { label: "D+ (1.5)", value: "1.5" },
  { label: "D (1.0)", value: "1.0" },
  { label: "F (0.0)", value: "0.0" },
];

export default function GradeCalculatorPage() {
  const [track, setTrack] = useState<TrackKey>("project");
  // state: { [courseId]: GradeValue }
  const [grades, setGrades] = useState<Record<string, GradeValue>>({});
  const [courseCredits, setCourseCredits] = useState<Record<string, number>>({});
  const [customCourses, setCustomCourses] = useState<CustomCourse[]>([]);
  const { t, courseName } = useLang();

  const plan = getTrackPlan(track);
  const allTerms = [...commonTerms, ...plan.terms];

  // Calculations
  const stats = useMemo(() => {
    let totalPoints = 0;
    let totalCredits = 0;
    
    const termsStats = allTerms.map((term, idx) => {
      let termPoints = 0;
      let termCredits = 0;
      
      // Regular courses
      term.courses.forEach(cid => {
        const gradeStr = grades[cid];
        if (gradeStr && gradeStr !== "none") {
          const c = getCourse(cid);
          if (c) {
            const creditNum = courseCredits[cid] ?? c.credits;
            if (!isNaN(creditNum)) {
              termCredits += creditNum;
              termPoints += creditNum * parseFloat(gradeStr);
            }
          }
        }
      });

      // Custom courses for this term
      const termCustom = customCourses.filter(c => c.termIndex === idx);
      termCustom.forEach(c => {
        if (c.grade && c.grade !== "none") {
          if (!isNaN(c.credits)) {
            termCredits += c.credits;
            termPoints += c.credits * parseFloat(c.grade);
          }
        }
      });
      
      totalPoints += termPoints;
      totalCredits += termCredits;
      
      return {
        ...term,
        termGpa: termCredits > 0 ? (termPoints / termCredits).toFixed(2) : "0.00",
        termCredits,
        customCourses: termCustom,
      };
    });

    return {
      gpax: totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00",
      totalCredits,
      termsStats,
    };
  }, [allTerms, grades, customCourses]);

  const handleGradeChange = (cid: string, val: GradeValue) => {
    setGrades(prev => ({ ...prev, [cid]: val }));
  };

  const handleAddCustomCourse = (termIndex: number) => {
    const newCourse: CustomCourse = {
      id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      termIndex,
      name: "",
      credits: 3,
      grade: "none",
    };
    setCustomCourses(prev => [...prev, newCourse]);
  };

  const handleUpdateCustomCourse = (id: string, field: keyof CustomCourse, value: any) => {
    setCustomCourses(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const handleRemoveCustomCourse = (id: string) => {
    setCustomCourses(prev => prev.filter(c => c.id !== id));
  };

  const handleResetAll = () => {
    setGrades({});
    setCourseCredits({});
    setCustomCourses([]);
  };

  return (
    <div className="container-page py-8 pb-32">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-widest text-cyan-700 dark:text-cyan-400 font-semibold mb-1">
          {t("gpa.kicker")}
        </p>
        <h1 className="text-3xl font-bold text-navy-900 dark:text-slate-100 flex items-center gap-3">
          <Calculator className="w-8 h-8 text-cyan-500" />
          {t("gpa.title")}
        </h1>
        <p className="mt-2 max-w-3xl text-slate-600 dark:text-slate-400">
          {t("gpa.desc")}
        </p>
      </header>

      {/* Track Selector & Global Stats */}
      <div className="grid md:grid-cols-[1fr_300px] gap-6 mb-8">
        <div className="card p-5 border-slate-200 dark:border-navy-700 self-start">
          <h3 className="text-sm font-semibold text-navy-900 dark:text-slate-200 mb-3">{t("curriculum.track")}</h3>
          <div className="flex flex-wrap gap-2">
            {(["project", "coop", "wil"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTrack(t)}
                className={`px-5 py-2.5 text-sm font-medium rounded-xl transition-all ${
                  track === t
                    ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/20"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-navy-800 dark:text-slate-300 dark:hover:bg-navy-700"
                }`}
              >
                {t === "project" ? "Project" : t === "coop" ? "Co-op" : "WIL"}
              </button>
            ))}
          </div>
          <div className="mt-4 flex gap-3">
            <button
              onClick={handleResetAll}
              className="text-xs font-medium text-slate-500 hover:text-rose-500 dark:text-slate-400 dark:hover:text-rose-400 transition-colors underline underline-offset-2"
            >
              รีเซ็ตทั้งหมด (Reset)
            </button>
          </div>
        </div>

        {/* Global Stats Box */}
        <div className="card p-6 bg-gradient-to-br from-navy-900 to-navy-950 border-0 shadow-xl shadow-navy-900/10 text-white relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none" />
          <h3 className="text-cyan-400 font-semibold text-sm mb-4 flex items-center gap-2">
            <GraduationCap className="w-5 h-5" /> {t("gpa.summary")}
          </h3>
          <div className="flex flex-col gap-1">
            <span className="text-slate-400 text-xs uppercase tracking-wider">{t("gpa.cumulative")}</span>
            <span className="text-5xl font-bold tracking-tight text-white mb-4">
              {stats.gpax}
            </span>
            <div className="flex items-center gap-2 text-sm text-cyan-200 bg-cyan-500/20 w-fit px-3 py-1.5 rounded-lg border border-cyan-500/30">
              <Award className="w-4 h-4" /> {t("gpa.totalCredits")}: {stats.totalCredits}
            </div>
          </div>
        </div>
      </div>

      {/* Terms Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {stats.termsStats.map((term, idx) => (
          <div key={idx} className="card overflow-hidden border-slate-200 dark:border-navy-700 flex flex-col">
            {/* Term Header */}
            <div className="bg-slate-50 dark:bg-navy-900 px-5 py-4 border-b border-slate-200 dark:border-navy-700 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg text-navy-900 dark:text-white">
                  {term.label}
                </h3>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                  วิชาทั้งหมด {term.courses.length + term.customCourses.length} ตัว
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end gap-1.5 text-navy-900 dark:text-cyan-400 font-bold text-xl">
                  <TrendingUp className="w-4 h-4 text-slate-400" />
                  {term.termGpa}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">
                  {t("gpa.termGpa")} ({term.termCredits} cr)
                </div>
              </div>
            </div>

            {/* Courses List */}
            <div className="p-4 flex-1 flex flex-col gap-3 bg-white dark:bg-navy-950/30">
              {/* Regular Courses */}
              {term.courses.map((cid) => {
                const c = getCourse(cid);
                if (!c) return null;
                const s = CATEGORY_STYLES[c.category];
                const currentVal = grades[cid] || "none";
                
                return (
                  <div key={cid} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 dark:border-navy-800 bg-slate-50/50 dark:bg-navy-900/50 hover:border-cyan-200 dark:hover:border-cyan-800 transition-colors">
                    <div className={`w-1.5 self-stretch rounded-full shrink-0 ${s.color}`} />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-mono text-[10px] font-bold text-slate-500 dark:text-slate-400">
                          {c.code}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-navy-900 dark:text-slate-200 truncate">
                        {courseName(c)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <select
                        value={courseCredits[cid] ?? c.credits}
                        onChange={(e) => setCourseCredits(prev => ({ ...prev, [cid]: parseInt(e.target.value) }))}
                        className="rounded-lg border border-slate-200 text-xs font-mono p-1.5 outline-none bg-slate-50 dark:bg-navy-950 dark:border-navy-700 dark:text-slate-300"
                      >
                        {[1, 2, 3, 4, 5, 6].map(cr => (
                          <option key={cr} value={cr}>{cr} cr</option>
                        ))}
                      </select>

                      <div className="w-24">
                        <select
                          value={currentVal}
                          onChange={(e) => handleGradeChange(cid, e.target.value as GradeValue)}
                          className={`w-full rounded-lg border text-sm font-medium p-1.5 outline-none transition-all cursor-pointer ${
                            currentVal !== "none" 
                              ? "bg-cyan-50 border-cyan-200 text-cyan-800 dark:bg-cyan-500/10 dark:border-cyan-500/30 dark:text-cyan-300 shadow-sm"
                              : "bg-white border-slate-200 text-slate-500 dark:bg-navy-950 dark:border-navy-700 dark:text-slate-400"
                          }`}
                        >
                          <option value="none">- เกรด -</option>
                          {GRADES.map(g => (
                            <option key={g.value} value={g.value}>
                              {g.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Custom Courses */}
              {term.customCourses.map(cc => (
                <div key={cc.id} className="flex items-center gap-2 sm:gap-3 p-3 rounded-xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-900 relative group transition-colors focus-within:border-cyan-300 dark:focus-within:border-cyan-700">
                  <div className={`w-1.5 self-stretch rounded-full shrink-0 bg-fuchsia-500`} />
                  
                  <div className="flex-1 flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      placeholder="ชื่อวิชา (วิชาเลือก/เสรี)"
                      value={cc.name}
                      onChange={(e) => handleUpdateCustomCourse(cc.id, "name", e.target.value)}
                      className="w-full text-sm font-medium text-navy-900 dark:text-slate-200 bg-transparent outline-none placeholder:text-slate-400"
                    />
                    
                    <div className="flex items-center gap-2">
                      <select
                        value={cc.credits}
                        onChange={(e) => handleUpdateCustomCourse(cc.id, "credits", parseInt(e.target.value))}
                        className="rounded-lg border border-slate-200 text-sm font-medium p-1.5 outline-none bg-slate-50 dark:bg-navy-950 dark:border-navy-700 dark:text-slate-300"
                      >
                        {[1, 2, 3, 4, 5, 6].map(cr => (
                          <option key={cr} value={cr}>{cr} cr</option>
                        ))}
                      </select>

                      <div className="shrink-0 w-24">
                        <select
                          value={cc.grade}
                          onChange={(e) => handleUpdateCustomCourse(cc.id, "grade", e.target.value as GradeValue)}
                          className={`w-full rounded-lg border text-sm font-medium p-1.5 outline-none transition-all cursor-pointer ${
                            cc.grade !== "none" 
                              ? "bg-cyan-50 border-cyan-200 text-cyan-800 dark:bg-cyan-500/10 dark:border-cyan-500/30 dark:text-cyan-300 shadow-sm"
                              : "bg-white border-slate-200 text-slate-500 dark:bg-navy-950 dark:border-navy-700 dark:text-slate-400"
                          }`}
                        >
                          <option value="none">- เกรด -</option>
                          {GRADES.map(g => (
                            <option key={g.value} value={g.value}>
                              {g.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRemoveCustomCourse(cc.id)}
                    className="p-1 rounded-md text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
                    aria-label="Remove course"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}

              <button
                onClick={() => handleAddCustomCourse(idx)}
                className="mt-2 flex items-center justify-center gap-2 w-full p-2.5 rounded-xl border border-dashed border-slate-300 dark:border-navy-700 text-sm font-medium text-slate-500 dark:text-slate-400 hover:border-cyan-300 hover:text-cyan-600 dark:hover:border-cyan-700 dark:hover:text-cyan-400 hover:bg-cyan-50/50 dark:hover:bg-cyan-900/10 transition-all"
              >
                <Plus className="w-4 h-4" /> เพิ่มวิชาเลือก / วิชาเสรี
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Sticky Bottom Bar for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-navy-950/80 backdrop-blur-md border-t border-slate-200 dark:border-navy-800 md:hidden z-30 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">{t("gpa.cumulative")}</p>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mt-0.5">
              {stats.totalCredits} {t("gpa.totalCredits")}
            </p>
          </div>
          <div className="text-3xl font-bold text-navy-900 dark:text-cyan-400">
            {stats.gpax}
          </div>
        </div>
      </div>
    </div>
  );
}
