"use client";

import { careers, getCourse } from "@/lib/data";
import { Briefcase, Award } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";

export default function CareersPage() {
  const { t, courseName } = useLang();
  return (
    <div className="container-page py-8">
      <header className="mb-6">
        <p className="text-xs uppercase tracking-widest text-cyan-700">{t("careers.kicker")}</p>
        <h1 className="mt-1 text-3xl font-semibold text-navy-900">{t("careers.title")}</h1>
        <p className="mt-2 max-w-3xl text-slate-600">{t("careers.desc")}</p>
      </header>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {careers.map((c) => (
          <article key={c.id} className="card p-5">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-cyan-50 text-cyan-700">
              <Briefcase className="h-5 w-5" />
            </span>
            <p className="mt-3 text-xs text-slate-500">{c.titleThai}</p>
            <h2 className="text-lg font-semibold text-navy-900">{c.title}</h2>
            <p className="mt-2 text-sm text-slate-700">{c.description}</p>

            <h3 className="mt-4 text-xs font-semibold text-slate-500 uppercase">
              {t("careers.skills")}
            </h3>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {c.skills.map((s) => (
                <span
                  key={s}
                  className="chip border border-slate-200 bg-slate-50 text-slate-700"
                >
                  {s}
                </span>
              ))}
            </div>

            <h3 className="mt-4 text-xs font-semibold text-slate-500 uppercase">
              {t("careers.relatedCourses")}
            </h3>
            <ul className="mt-1 grid gap-1.5">
              {c.relatedCourses.map((cid) => {
                const co = getCourse(cid);
                if (!co) return null;
                return (
                  <li
                    key={cid}
                    className="rounded-md border border-slate-200 px-2.5 py-1.5"
                  >
                    <p className="font-mono text-[10px] text-slate-500">{co.code}</p>
                    <p className="text-sm text-navy-900">{courseName(co)}</p>
                  </li>
                );
              })}
            </ul>

            <p className="mt-4 text-xs text-slate-600 flex items-start gap-1.5">
              <Award className="h-3.5 w-3.5 mt-0.5 text-fuchsia-600" />
              {c.electiveHint}
            </p>
            {c.note && (
              <p className="mt-2 text-[11px] text-amber-700">{c.note}</p>
            )}
          </article>
        ))}
      </div>

      <p className="mt-8 text-xs text-slate-500">
        หมายเหตุ: คำแนะนำเรื่อง Certification และเส้นทางอาชีพในหน้านี้เป็น
        คำแนะนำเพิ่มเติม ไม่ใช่ข้อกำหนดของหลักสูตร
      </p>
    </div>
  );
}
