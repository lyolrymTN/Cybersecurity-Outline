"use client";

import Link from "next/link";
import { AlertTriangle, FileText, ExternalLink } from "lucide-react";
import { useLang } from "./LanguageProvider";
import { OFFICIAL_PDF_URL } from "@/lib/data";
import Image from "next/image";
import { asset } from "@/lib/asset";

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="mt-16 border-t border-slate-200 bg-navy-900 text-slate-200 no-print">
      <div className="container-page py-10 grid gap-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 p-1.5 shadow-sm ring-1 ring-slate-200 dark:ring-navy-700">
              <Image
                src={asset("/Cyber.png")}
                alt="Cyber Security Khon Kaen University Logo"
                width={48}
                height={48}
                className="h-full w-full object-contain"
              />
            </div>
            <p className="font-semibold text-white">Cybersecurity Curriculum</p>
          </div>
          <p className="mt-3 max-w-md text-sm text-slate-300">{t("footer.intro")}</p>
          <p className="mt-3 flex items-start gap-2 rounded-md border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-xs text-amber-200">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            {t("footer.disclaimer")}
          </p>
          <a
            href={OFFICIAL_PDF_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-xs text-cyan-300 hover:text-cyan-200 hover:underline"
          >
            <FileText className="h-4 w-4" />
            {t("source.officialPdf")}
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">{t("footer.nav")}</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li><Link href="/curriculum">{t("nav.curriculum")}</Link></li>
            <li><Link href="/courses">{t("nav.courses")}</Link></li>
            <li><Link href="/electives">{t("nav.electives")}</Link></li>
            <li><Link href="/prerequisite">{t("nav.prerequisite")}</Link></li>
            <li><Link href="/study-plan">{t("nav.studyPlan")}</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{t("footer.paths")}</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li><Link href="/pathways">Project / Co-op / WIL</Link></li>
            <li><Link href="/outcomes">{t("nav.outcomes")}</Link></li>
            <li><Link href="/careers">{t("nav.careers")}</Link></li>
            <li><Link href="/advisor">{t("nav.advisor")}</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="container-page py-4 text-xs text-slate-400">
          © {new Date().getFullYear()} {t("footer.copy")}
        </div>
      </div>
    </footer>
  );
}
