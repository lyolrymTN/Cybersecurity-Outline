"use client";

import Link from "next/link";
import {
  Shield,
  Search,
  Network,
  GitFork,
  AlertTriangle,
  Compass,
  ArrowRight,
  GraduationCap,
  Brain,
  Lock,
  Code2,
} from "lucide-react";
import {
  programInfo,
  commonTerms,
  getTrackPlan,
  courses,
  careers,
} from "@/lib/data";
import { useLang } from "@/components/LanguageProvider";

export default function HomePage() {
  const { t, locale } = useLang();
  const coreCount = courses.filter((c) => c.category === "core").length;

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-grid-fade text-white">
        <div className="hero-grid absolute inset-0 opacity-50" />
        <div className="container-page relative py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200">
              <Shield className="h-3.5 w-3.5" /> {t("home.heroBadge")}
            </p>
            <h1 className="mt-5 text-3xl md:text-5xl font-semibold leading-tight">
              <span className="block">
                {locale === "en" ? programInfo.englishName : programInfo.thaiName}
              </span>
              <span className="mt-2 block text-cyan-300 text-lg md:text-2xl font-medium">
                {locale === "en" ? programInfo.thaiName : programInfo.englishName}
              </span>
            </h1>
            <p className="mt-5 max-w-2xl text-slate-300">{t("home.heroSub")}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/curriculum" className="btn-cyber">
                <Network className="h-4 w-4" /> {t("home.cta.outline")}
              </Link>
              <Link
                href="/courses"
                className="btn-outline bg-white/10 border-white/20 text-white hover:bg-white/15"
              >
                <Search className="h-4 w-4" /> {t("home.cta.courses")}
              </Link>
              <Link
                href="/prerequisite"
                className="btn-outline bg-white/10 border-white/20 text-white hover:bg-white/15"
              >
                <GitFork className="h-4 w-4" /> {t("home.cta.prereq")}
              </Link>
              <Link
                href="/pathways"
                className="btn-outline bg-white/10 border-white/20 text-white hover:bg-white/15"
              >
                <Compass className="h-4 w-4" /> {t("home.cta.pathways")}
              </Link>
              <Link
                href="/electives"
                className="btn-outline bg-emerald-500/15 border-emerald-300/30 text-emerald-100 hover:bg-emerald-500/25"
              >
                <GraduationCap className="h-4 w-4" /> {t("nav.electives")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key facts */}
      <section className="container-page -mt-10 grid gap-4 md:grid-cols-4 relative z-10">
        <Fact label={t("home.fact.duration")} value={t("home.fact.durationVal")} sub={t("home.fact.durationSub")} />
        <Fact
          label={t("home.fact.credits")}
          value={`${programInfo.totalCredits}`}
          sub={t("home.fact.creditsSub")}
        />
        <Fact label={t("home.fact.core")} value={`${coreCount}`} sub={t("home.fact.coreSub")} />
        <Fact
          label={t("home.fact.faculty")}
          value={locale === "en" ? programInfo.facultyEnglish : programInfo.faculty}
          sub={locale === "en" ? programInfo.universityEnglish : programInfo.university}
        />
      </section>

      {/* What you learn */}
      <section className="container-page py-16">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs uppercase tracking-widest text-cyan-700">
              {t("home.section.whatLearn")}
            </p>
            <h2 className="mt-1 text-2xl md:text-3xl font-semibold text-navy-900">
              {t("home.section.whatLearnTitle")}
            </h2>
          </div>
          <Link href="/curriculum" className="btn-ghost">
            {t("common.openCurriculum")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Pillar
            icon={<Code2 className="h-5 w-5" />}
            title={t("home.pillar.prog")}
            desc={t("home.pillar.progDesc")}
          />
          <Pillar
            icon={<Network className="h-5 w-5" />}
            title={t("home.pillar.net")}
            desc={t("home.pillar.netDesc")}
          />
          <Pillar
            icon={<Lock className="h-5 w-5" />}
            title={t("home.pillar.sec")}
            desc={t("home.pillar.secDesc")}
          />
          <Pillar
            icon={<Brain className="h-5 w-5" />}
            title={t("home.pillar.ai")}
            desc={t("home.pillar.aiDesc")}
          />
        </div>
      </section>

      {/* Outline preview */}
      <section className="container-page py-10">
        <div className="card overflow-hidden">
          <div className="grid lg:grid-cols-[1.2fr_1fr]">
            <div className="p-6 md:p-8">
              <p className="text-xs uppercase tracking-widest text-fuchsia-700">
                {t("home.outline.kicker")}
              </p>
              <h2 className="mt-1 text-2xl md:text-3xl font-semibold text-navy-900">
                {t("home.outline.title")}
              </h2>
              <p className="mt-3 text-slate-600 max-w-md">{t("home.outline.desc")}</p>
              <div className="mt-5 flex flex-wrap gap-2 text-xs">
                {[
                  { c: "bg-emerald-500", l: "Gen-Ed" },
                  { c: "bg-orange-500", l: "Math & Sci" },
                  { c: "bg-sky-500", l: "Core" },
                  { c: "bg-fuchsia-500", l: "Elective" },
                  { c: "bg-emerald-300", l: "Free Elective" },
                ].map((b) => (
                  <span
                    key={b.l}
                    className={`rounded-full px-2.5 py-1 text-white ${b.c}`}
                  >
                    {b.l}
                  </span>
                ))}
              </div>
              <Link href="/curriculum" className="mt-6 inline-block btn-primary">
                {t("common.openCurriculum")} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="bg-grid-fade p-6 lg:p-8">
              <MiniOutline />
            </div>
          </div>
        </div>
      </section>

      {/* Risk / advisor preview */}
      <section className="container-page py-10 grid gap-6 md:grid-cols-3">
        <FeatureCard
          icon={<GitFork className="h-5 w-5" />}
          title={t("nav.prerequisite")}
          desc={t("home.feature.prereqDesc")}
          href="/prerequisite"
          accent="from-cyan-500 to-navy-600"
          openLabel={t("home.feature.open")}
        />
        <FeatureCard
          icon={<AlertTriangle className="h-5 w-5" />}
          title={t("home.feature.risk")}
          desc={t("home.feature.riskDesc")}
          href="/curriculum"
          accent="from-orange-500 to-red-500"
          openLabel={t("home.feature.open")}
        />
        <FeatureCard
          icon={<GraduationCap className="h-5 w-5" />}
          title={t("home.feature.pathway")}
          desc={t("home.feature.pathwayDesc")}
          href="/pathways"
          accent="from-fuchsia-500 to-purple-600"
          openLabel={t("home.feature.open")}
        />
      </section>

      {/* Careers */}
      <section className="container-page py-16">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs uppercase tracking-widest text-cyan-700">
              {t("home.careers.kicker")}
            </p>
            <h2 className="mt-1 text-2xl md:text-3xl font-semibold text-navy-900">
              {t("home.careers.title")}
            </h2>
          </div>
          <Link href="/careers" className="btn-ghost">
            {t("common.viewAll")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {careers.slice(0, 6).map((c) => (
            <div key={c.id} className="card p-5">
              <p className="text-xs text-slate-500">
                {locale === "en" ? c.title : c.titleThai}
              </p>
              <h3 className="mt-1 font-semibold text-navy-900">
                {locale === "en" ? c.titleThai : c.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 line-clamp-3">{c.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {c.skills.slice(0, 3).map((s) => (
                  <span key={s} className="chip border border-slate-200 bg-slate-50 text-slate-700">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page pb-16">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900 flex gap-3">
          <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
          <p>{t("common.disclaimer")}</p>
        </div>
      </section>
    </>
  );
}

function Fact({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="card p-5">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-navy-900">{value}</p>
      <p className="text-xs text-slate-500">{sub}</p>
    </div>
  );
}

function Pillar({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="card p-5">
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-navy-50 text-navy-700">
        {icon}
      </span>
      <h3 className="mt-3 font-semibold text-navy-900">{title}</h3>
      <p className="mt-1 text-sm text-slate-600">{desc}</p>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
  href,
  accent,
  openLabel,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  href: string;
  accent: string;
  openLabel: string;
}) {
  return (
    <Link
      href={href}
      className="card p-5 group hover:-translate-y-0.5 transition"
    >
      <span
        className={`grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br ${accent} text-white`}
      >
        {icon}
      </span>
      <h3 className="mt-3 font-semibold text-navy-900">{title}</h3>
      <p className="mt-1 text-sm text-slate-600">{desc}</p>
      <p className="mt-3 inline-flex items-center gap-1 text-sm text-cyan-700 group-hover:underline">
        {openLabel} <ArrowRight className="h-3.5 w-3.5" />
      </p>
    </Link>
  );
}

function MiniOutline() {
  const colors = [
    "#10b981",
    "#f97316",
    "#0ea5e9",
    "#0ea5e9",
    "#0ea5e9",
    "#d946ef",
    "#6ee7b7",
  ];
  return (
    <div className="grid grid-cols-4 gap-2">
      {Array.from({ length: 28 }).map((_, i) => (
        <div
          key={i}
          className="h-10 rounded-md opacity-90"
          style={{ background: colors[i % colors.length] }}
        />
      ))}
    </div>
  );
}
