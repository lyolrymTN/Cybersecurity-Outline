"use client";

import { learningOutcomes } from "@/lib/data";
import { Sparkles } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";

export default function OutcomesPage() {
  const { t } = useLang();
  return (
    <div className="container-page py-8">
      <header className="mb-6">
        <p className="text-xs uppercase tracking-widest text-cyan-700">
          {t("outcomes.kicker")}
        </p>
        <h1 className="mt-1 text-3xl font-semibold text-navy-900">{t("outcomes.title")}</h1>
      </header>

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 mb-6">
        <p>{learningOutcomes.note}</p>
      </div>

      <section>
        <h2 className="text-lg font-semibold text-navy-900">{t("outcomes.plo")}</h2>
        <p className="text-sm text-slate-600">{t("outcomes.ploDesc")}</p>
        <ol className="mt-4 grid gap-3 md:grid-cols-2">
          {learningOutcomes.plo.map((p) => (
            <li key={p.id} className="card p-4 flex gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-cyan-50 text-cyan-700 font-mono text-xs">
                {p.id}
              </span>
              <p className="text-sm text-navy-900">{p.label}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-navy-900">{t("outcomes.ylo")}</h2>
        <p className="text-sm text-slate-600">{t("outcomes.yloDesc")}</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {Object.entries(learningOutcomes.ylo).map(([year, label]) => (
            <div key={year} className="card p-4">
              <span className="badge border-fuchsia-200 bg-fuchsia-50 text-fuchsia-700">
                {t("common.year")} {year}
              </span>
              <p className="mt-2 text-sm text-navy-900">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 card p-5 bg-gradient-to-br from-navy-900 to-navy-700 text-white">
        <p className="flex items-center gap-2 text-sm">
          <Sparkles className="h-4 w-4 text-cyan-300" /> Student Friendly
        </p>
        <h3 className="mt-1 text-xl font-semibold">
          PLO/YLO เหล่านี้แปลว่าอะไรในชีวิตจริง?
        </h3>
        <ul className="mt-3 space-y-2 text-sm text-slate-200">
          <li>• เข้าใจระบบ ตั้งแต่ network → OS → cloud → app</li>
          <li>• เขียนโปรแกรมพร้อมคิดเรื่องความปลอดภัยตั้งแต่ออกแบบ</li>
          <li>• อ่านสถานการณ์ภัยคุกคามและเสนอแผนตอบสนองได้</li>
          <li>• ทำงานร่วมกับทีม สื่อสารด้วยภาษาเทคนิคและภาษาธุรกิจ</li>
          <li>• ติดตามมาตรฐาน/กฎหมาย/จริยธรรมในวิชาชีพอย่างต่อเนื่อง</li>
        </ul>
      </section>
    </div>
  );
}
