import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ThemeProvider, THEME_INIT_SCRIPT } from "@/components/ThemeProvider";
import { LanguageProvider, LANG_INIT_SCRIPT } from "@/components/LanguageProvider";

export const metadata: Metadata = {
  title: {
    default: "CY Curriculum — หลักสูตรความมั่นคงปลอดภัยไซเบอร์",
    template: "%s — CY Curriculum",
  },
  description:
    "เว็บไซต์นำทางหลักสูตรวิทยาศาสตรบัณฑิต สาขาวิชาความมั่นคงปลอดภัยไซเบอร์ — โครงสร้างหลักสูตร แผนการเรียน 4 ปี รายวิชา prerequisite และเส้นทาง Project/Co-op/WIL",
  keywords: [
    "Cybersecurity",
    "Curriculum",
    "ความมั่นคงปลอดภัยไซเบอร์",
    "หลักสูตร",
    "Khon Kaen University",
    "College of Computing",
  ],
  openGraph: {
    title: "CY Curriculum — หลักสูตรความมั่นคงปลอดภัยไซเบอร์",
    description:
      "ระบบนำทางหลักสูตร Cybersecurity แบบ interactive: outline, prerequisite checker, study plan และเส้นทาง Project/Co-op/WIL",
    type: "website",
  },
    icons: {
    icon: "/Cyber.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <script dangerouslySetInnerHTML={{ __html: LANG_INIT_SCRIPT }} />
      </head>
      <body className="min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-fg)]">
        <ThemeProvider>
          <LanguageProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
