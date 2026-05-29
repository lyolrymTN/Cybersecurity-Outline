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
  ChevronRight,
  Terminal,
  Activity,
  Briefcase
} from "lucide-react";
import {
  programInfo,
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
          <Fact 
            label={t("home.fact.duration")} 
            value={t("home.fact.durationVal")} 
            sub={t("home.fact.durationSub")} 
            accent="bg-cyan-500" 
          />
          <Fact
            label={t("home.fact.credits")}
            value={`${programInfo.totalCredits}`}
            sub={t("home.fact.creditsSub")}
            accent="bg-emerald-500"
          />
          <Fact 
            label={t("home.fact.core")} 
            value={`${coreCount}`} 
            sub={t("home.fact.coreSub")} 
            accent="bg-fuchsia-500" 
          />
          <Fact
            label={t("home.fact.faculty")}
            value={locale === "en" ? programInfo.facultyEnglish : "วิทยาลัยการคอมพิวเตอร์"}
            sub={locale === "en" ? programInfo.universityEnglish : "มหาวิทยาลัยขอนแก่น"}
            accent="bg-orange-500"
          />
      </section>

      {/* What you learn */}
      <section className="container-page py-24">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold tracking-widest text-xs uppercase mb-3">
              <Terminal className="h-4 w-4" />
              <span>{t("home.section.whatLearn")}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 dark:text-white">
              {t("home.section.whatLearnTitle")}
            </h2>
          </div>
          <Link href="/curriculum" className="btn-ghost group">
            {t("common.openCurriculum")} 
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Pillar
            icon={<Code2 className="h-6 w-6" />}
            title={t("home.pillar.prog")}
            desc={t("home.pillar.progDesc")}
            delay="delay-[0ms]"
          />
          <Pillar
            icon={<Network className="h-6 w-6" />}
            title={t("home.pillar.net")}
            desc={t("home.pillar.netDesc")}
            delay="delay-[100ms]"
          />
          <Pillar
            icon={<Lock className="h-6 w-6" />}
            title={t("home.pillar.sec")}
            desc={t("home.pillar.secDesc")}
            delay="delay-[200ms]"
          />
          <Pillar
            icon={<Brain className="h-6 w-6" />}
            title={t("home.pillar.ai")}
            desc={t("home.pillar.aiDesc")}
            delay="delay-[300ms]"
          />
        </div>
      </section>

      {/* Outline preview */}
      <section className="container-page py-16">
        <div className="card overflow-hidden border-0 shadow-2xl shadow-navy-900/5 dark:shadow-black/50 bg-gradient-to-br from-white to-slate-50 dark:from-navy-900 dark:to-navy-950">
          <div className="grid lg:grid-cols-[1.1fr_1fr]">
            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 text-fuchsia-600 dark:text-fuchsia-400 font-bold tracking-widest text-xs uppercase mb-4">
                <Activity className="h-4 w-4" />
                <span>{t("home.outline.kicker")}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-navy-900 dark:text-white leading-tight">
                {t("home.outline.title")}
              </h2>
              <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
                {t("home.outline.desc")}
              </p>
              
              <div className="mt-8 flex flex-wrap gap-2.5 text-xs font-medium">
                {[
                  { c: "bg-emerald-500/10 text-emerald-700 border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/30", l: "Gen-Ed" },
                  { c: "bg-orange-500/10 text-orange-700 border-orange-200 dark:bg-orange-500/20 dark:text-orange-300 dark:border-orange-500/30", l: "Math & Sci" },
                  { c: "bg-sky-500/10 text-sky-700 border-sky-200 dark:bg-sky-500/20 dark:text-sky-300 dark:border-sky-500/30", l: "Core" },
                  { c: "bg-fuchsia-500/10 text-fuchsia-700 border-fuchsia-200 dark:bg-fuchsia-500/20 dark:text-fuchsia-300 dark:border-fuchsia-500/30", l: "Elective" },
                ].map((b) => (
                  <span
                    key={b.l}
                    className={`rounded-full px-3 py-1.5 border ${b.c}`}
                  >
                    {b.l}
                  </span>
                ))}
              </div>
              
              <div className="mt-10">
                <Link href="/curriculum" className="btn-primary px-6 py-3 rounded-xl shadow-lg shadow-navy-900/20 dark:shadow-cyan-500/20 group">
                  {t("common.openCurriculum")} 
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            
            <div className="bg-slate-100/50 dark:bg-navy-950/50 p-8 lg:p-12 border-l border-slate-200 dark:border-navy-800 flex items-center justify-center relative overflow-hidden">
              <div className="hero-grid absolute inset-0 opacity-[0.4] dark:opacity-[0.1]" />
              <MiniOutline />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Features */}
      <section className="container-page py-20 grid gap-6 md:grid-cols-3">
        <FeatureCard
          icon={<GitFork className="h-6 w-6" />}
          title={t("nav.prerequisite")}
          desc={t("home.feature.prereqDesc")}
          href="/prerequisite"
          accent="from-cyan-400 to-blue-600"
          openLabel={t("home.feature.open")}
        />
        <FeatureCard
          icon={<AlertTriangle className="h-6 w-6" />}
          title={t("home.feature.risk")}
          desc={t("home.feature.riskDesc")}
          href="/curriculum"
          accent="from-orange-400 to-red-600"
          openLabel={t("home.feature.open")}
        />
        <FeatureCard
          icon={<GraduationCap className="h-6 w-6" />}
          title={t("home.feature.pathway")}
          desc={t("home.feature.pathwayDesc")}
          href="/pathways"
          accent="from-fuchsia-400 to-purple-600"
          openLabel={t("home.feature.open")}
        />
      </section>

      {/* Careers */}
      <section className="container-page py-20 border-t border-slate-200 dark:border-navy-800">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold tracking-widest text-xs uppercase mb-3">
              <Briefcase className="h-4 w-4" />
              <span>{t("home.careers.kicker")}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 dark:text-white">
              {t("home.careers.title")}
            </h2>
          </div>
          <Link href="/careers" className="btn-ghost group">
            {t("common.viewAll")} 
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {careers.slice(0, 6).map((c) => (
            <div key={c.id} className="card p-6 hover:shadow-xl hover:shadow-navy-900/5 dark:hover:shadow-black/50 transition-all duration-300 hover:-translate-y-1 group">
              <p className="text-xs font-medium text-cyan-600 dark:text-cyan-400 mb-2 uppercase tracking-wide">
                {locale === "en" ? c.title : c.titleThai}
              </p>
              <h3 className="text-lg font-bold text-navy-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                {locale === "en" ? c.titleThai : c.title}
              </h3>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                {c.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {c.skills.slice(0, 3).map((s) => (
                  <span key={s} className="px-2.5 py-1 text-[10px] font-medium rounded bg-slate-100 text-slate-600 dark:bg-navy-800 dark:text-slate-300">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page pb-20">
        <div className="rounded-2xl border border-amber-200/60 bg-amber-50/50 dark:bg-amber-900/10 dark:border-amber-900/30 p-6 flex items-start gap-4 shadow-sm">
          <div className="p-2 bg-amber-100 dark:bg-amber-900/50 rounded-lg text-amber-600 dark:text-amber-400 shrink-0">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-amber-900 dark:text-amber-300 mb-1">Disclaimer</h4>
            <p className="text-sm text-amber-800/80 dark:text-amber-400/80 leading-relaxed">
              {t("common.disclaimer")}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function Fact({ label, value, sub, accent }: { label: string; value: string; sub: string; accent: string }) {
  return (
    <div className="card p-6 md:p-8 backdrop-blur-xl bg-white/90 dark:bg-navy-900/90 hover:shadow-xl hover:shadow-navy-900/5 dark:hover:shadow-black/50 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group">
      <div className={`absolute top-0 left-0 w-full h-1 ${accent} opacity-80 group-hover:opacity-100 transition-opacity`} />
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-2 text-4xl font-bold text-navy-900 dark:text-white tracking-tight">{value}</p>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{sub}</p>
    </div>
  );
}

function Pillar({
  icon,
  title,
  desc,
  delay
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  delay: string;
}) {
  return (
    <div className={`card p-6 md:p-8 hover:shadow-xl hover:shadow-navy-900/5 dark:hover:shadow-black/50 transition-all duration-500 hover:-translate-y-2 group animate-in fade-in slide-in-from-bottom-8 ${delay} fill-mode-both`}>
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 dark:bg-navy-800 dark:text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-white dark:group-hover:bg-cyan-500 transition-all duration-300 mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-3">{title}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{desc}</p>
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
      className="card p-8 group hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-900/5 dark:hover:shadow-black/50 transition-all duration-300 relative overflow-hidden"
    >
      <div className={`absolute -right-12 -top-12 w-40 h-40 bg-gradient-to-br ${accent} opacity-5 group-hover:opacity-10 transition-opacity rounded-full blur-2xl`} />
      
      <span
        className={`inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${accent} text-white shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}
      >
        {icon}
      </span>
      <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-3">{title}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">{desc}</p>
      
      <div className="flex items-center gap-1.5 text-sm font-semibold text-cyan-600 dark:text-cyan-400 group-hover:text-cyan-700 dark:group-hover:text-cyan-300">
        {openLabel} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}

function MiniOutline() {
  const colors = [
    "bg-emerald-500",
    "bg-orange-500",
    "bg-sky-500",
    "bg-sky-500",
    "bg-sky-500",
    "bg-fuchsia-500",
    "bg-emerald-300",
  ];
  
  return (
    <div className="relative w-full max-w-[400px] z-10 perspective-1000">
      <div className="grid grid-cols-4 gap-3 transform rotate-[-2deg] hover:rotate-0 transition-transform duration-700 ease-out">
        {Array.from({ length: 28 }).map((_, i) => {
          const colorClass = colors[i % colors.length];
          const delay = (i % 4) * 100 + Math.floor(i / 4) * 50;
          return (
            <div
              key={i}
              className={`h-12 rounded-lg opacity-80 hover:opacity-100 shadow-sm ${colorClass} animate-in fade-in zoom-in-95 fill-mode-both hover:-translate-y-1 hover:shadow-md transition-all cursor-pointer`}
              style={{ animationDelay: `${delay}ms`, animationDuration: '800ms' }}
            />
          );
        })}
      </div>
      
      {/* Floating Decorative Elements */}
      <div className="absolute -top-6 -right-6 w-12 h-12 rounded-full bg-cyan-400/20 blur-xl animate-pulse" />
      <div className="absolute -bottom-8 -left-8 w-16 h-16 rounded-full bg-fuchsia-400/20 blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
    </div>
  );
}
