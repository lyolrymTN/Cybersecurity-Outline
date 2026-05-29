"use client";

import Link from "next/link";
import { tracks, getCourse } from "@/lib/data";
import { AlertTriangle, CheckCircle2, Users } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";

export default function PathwaysPage() {
  const { t, courseName } = useLang();
  return (
    <div className="container-page py-8">
      <header className="mb-6">
        <p className="text-xs uppercase tracking-widest text-cyan-700">{t("paths.kicker")}</p>
        <h1 className="mt-1 text-3xl font-semibold text-navy-900">{t("paths.title")}</h1>
        <p className="mt-2 max-w-3xl text-slate-600">{t("paths.desc")}</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        {tracks.map((tr) => (
          <article key={tr.id} className="card overflow-hidden">
            <header
              className={`px-5 py-4 text-white ${
                tr.id === "project"
                  ? "bg-gradient-to-br from-fuchsia-500 to-purple-700"
                  : tr.id === "coop"
                  ? "bg-gradient-to-br from-cyan-500 to-navy-700"
                  : "bg-gradient-to-br from-orange-500 to-red-600"
              }`}
            >
              <p className="text-xs opacity-80">{tr.nameEnglish}</p>
              <h2 className="mt-1 text-xl font-semibold">{tr.nameThai}</h2>
            </header>
            <div className="p-5 space-y-4">
              <p className="text-sm text-slate-700">{tr.description}</p>

              <section>
                <h3 className="text-sm font-semibold text-navy-900 flex items-center gap-1.5">
                  <Users className="h-4 w-4" /> {t("paths.suitable")}
                </h3>
                <ul className="mt-2 space-y-1 text-sm text-slate-700">
                  {tr.suitableFor.map((s) => (
                    <li key={s} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500 shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="text-sm font-semibold text-navy-900">{t("paths.requirements")}</h3>
                <ul className="mt-2 space-y-1 text-sm text-slate-700 list-disc pl-5">
                  {tr.requirements.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </section>

              {tr.requiredCourses.length > 0 && (
                <section>
                  <h3 className="text-sm font-semibold text-navy-900">{t("paths.courses")}</h3>
                  <ul className="mt-2 grid gap-1.5">
                    {tr.requiredCourses.map((cid) => {
                      const c = getCourse(cid);
                      if (!c) return null;
                      return (
                        <li key={cid} className="rounded-md border border-slate-200 px-2.5 py-1.5">
                          <p className="font-mono text-[10px] text-slate-500">{c.code}</p>
                          <p className="text-sm text-slate-800">{courseName(c)}</p>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              )}

              <section className="rounded-lg border border-amber-200 bg-amber-50 p-3">
                <p className="text-sm font-semibold text-amber-900 flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4" /> {t("paths.warnings")}
                </p>
                <ul className="mt-2 space-y-1 text-xs text-amber-900 list-disc pl-5">
                  {tr.warnings.map((w) => (
                    <li key={w}>{w}</li>
                  ))}
                </ul>
              </section>

              <div className="text-xs text-slate-500">
                Elective ≥ {tr.electiveCreditsRequired ?? "-"} · Free ≥{" "}
                {tr.freeElectiveCreditsRequired ?? "-"} {t("common.credits")}
              </div>

              <Link
                href={`/study-plan?track=${tr.id}`}
                className="inline-block text-sm text-cyan-700 hover:underline"
              >
                ดูแผนการเรียนของเส้นทางนี้ →
              </Link>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-8 text-xs text-slate-500">
        หมายเหตุ: ข้อมูลในหน้านี้สรุปจากตัวอย่างแผนการศึกษาและภาพ CY Curriculum Outline ที่ให้มา
        รายละเอียดของ WIL บางส่วนยังต้องตรวจสอบกับหลักสูตรอย่างเป็นทางการ
      </p>
    </div>
  );
}
