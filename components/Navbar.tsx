"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { useLang } from "./LanguageProvider";
import { asset } from "@/lib/asset";

const NAV_KEYS = [
  { href: "/", k: "nav.home" },
  { href: "/curriculum", k: "nav.curriculum" },
  { href: "/courses", k: "nav.courses" },
  { href: "/electives", k: "nav.electives" },
  { href: "/prerequisite", k: "nav.prerequisite" },
  { href: "/study-plan", k: "nav.studyPlan" },
  { href: "/pathways", k: "nav.pathways" },
  { href: "/outcomes", k: "nav.outcomes" },
  { href: "/careers", k: "nav.careers" },
  { href: "/advisor", k: "nav.advisor" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { t } = useLang();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur dark:border-navy-700 dark:bg-navy-950/80 no-print">
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 p-1.5 shadow-sm ring-1 ring-slate-200 dark:ring-navy-700">
              <Image
                src={asset("/Cyber.png")}
                alt="Cyber Security Khon Kaen University Logo"
                width={48}
                height={48}
                className="h-full w-full object-contain"
                priority
              />
            </div>
          <div className="leading-tight">
            <p className="font-semibold text-navy-900 dark:text-slate-100">
              Cybersecurity Curriculum
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {t("nav.brand.tagline")}
            </p>
          </div>
        </Link>

        <nav className="hidden xl:flex items-center gap-1">
          {NAV_KEYS.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-1.5 text-sm transition ${
                  active
                    ? "bg-navy-700 text-white dark:bg-cyan-500 dark:text-navy-950"
                    : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-navy-800"
                }`}
              >
                {t(item.k)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <button
            aria-label={t("common.menu")}
            className="xl:hidden rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-navy-800"
            onClick={() => setOpen((s) => !s)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="xl:hidden border-t border-slate-200 bg-white dark:border-navy-700 dark:bg-navy-900">
          <div className="container-page py-2 flex flex-col">
            {NAV_KEYS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-2 text-sm text-slate-700 dark:text-slate-200"
              >
                {t(item.k)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
