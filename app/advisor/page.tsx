"use client";

import { CheckCircle2, AlertTriangle, BookOpen, GraduationCap } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";

export default function AdvisorPage() {
  const { t } = useLang();
  return (
    <div className="container-page py-8">
      <header className="mb-6">
        <p className="text-xs uppercase tracking-widest text-cyan-700">{t("advisor.kicker")}</p>
        <h1 className="mt-1 text-3xl font-semibold text-navy-900">{t("advisor.title")}</h1>
        <p className="mt-2 max-w-3xl text-slate-600">{t("advisor.desc")}</p>
      </header>

      <div className="grid gap-5 md:grid-cols-2">
        <Section title="Checklist ก่อนลงทะเบียน" icon={<CheckCircle2 className="text-emerald-600" />}>
          <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5">
            <li>ตรวจสอบผลการเรียนเทอมที่แล้ว วิชาใดผ่าน/ติด F/W</li>
            <li>เปิดหน้า <em>ตรวจสอบวิชาต่อ</em> เพื่อจำลองสถานการณ์</li>
            <li>ดู prerequisite ของวิชาที่ตั้งใจลง</li>
            <li>คำนวณหน่วยกิตรวมในเทอม ไม่เกินที่หลักสูตรอนุญาต</li>
            <li>วางแผน Project / Co-op / WIL ล่วงหน้าตั้งแต่ปี 2 เป็นต้นไป</li>
            <li>พูดคุยกับอาจารย์ที่ปรึกษาก่อนตัดสินใจขั้นสุดท้าย</li>
          </ul>
        </Section>

        <Section title="วิธีอ่าน Prerequisite" icon={<BookOpen className="text-cyan-600" />}>
          <p className="text-sm text-slate-700">
            Prerequisite คือวิชาที่ต้อง “ผ่าน” มาก่อนถึงจะลงวิชาถัดไปได้
            ในเว็บไซต์นี้:
          </p>
          <ul className="mt-2 space-y-2 text-sm text-slate-700 list-disc pl-5">
            <li>วิชาที่มี marker <span className="kbd">P</span> มี prerequisite</li>
            <li>คลิกที่วิชาเพื่อดูรายการที่ต้องผ่าน</li>
            <li>เส้นในไดอะแกรมจะลากจากวิชาก่อนไปวิชาถัดไป</li>
            <li>หาก prerequisite ระบุ "หรือเทียบเท่า" ให้ปรึกษาอาจารย์ที่ปรึกษา</li>
          </ul>
        </Section>

        <Section title="ถ้าติด F ต้องทำอย่างไร" icon={<AlertTriangle className="text-orange-600" />}>
          <ol className="space-y-2 text-sm text-slate-700 list-decimal pl-5">
            <li>ไม่ตื่นตระหนก — ตรวจสอบว่าวิชานี้เป็น prerequisite ของวิชาใดบ้าง</li>
            <li>เปิดหน้า <em>ตรวจสอบวิชาต่อ</em> ติ๊กว่าวิชานี้ติด F แล้วดูวิชาที่ถูก block</li>
            <li>วางแผนลงซ้ำในเทอมที่ใกล้ที่สุดเท่าที่ทำได้</li>
            <li>หากกระทบ Project/Co-op/WIL ปรึกษาอาจารย์ที่ปรึกษาเพื่อปรับแผน</li>
            <li>พิจารณาลงวิชาเลือก/เลือกเสรีที่ <strong>ไม่</strong> ใช้วิชาที่ติดเป็น prerequisite ในระหว่างรอ</li>
          </ol>
        </Section>

        <Section title="วิธีเลือก Elective / Free Elective" icon={<GraduationCap className="text-fuchsia-600" />}>
          <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5">
            <li>เริ่มจากความสนใจ — Pentest, AI, Cloud, GRC ฯลฯ</li>
            <li>ดูหน้า <em>อาชีพ</em> เพื่อ map ทักษะ → วิชา</li>
            <li>ตรวจสอบ prerequisite ของวิชาเลือกก่อนเลือก</li>
            <li>เผื่อ Certification ที่อยากเก็บ ให้สอดคล้องกับ Elective</li>
          </ul>
        </Section>

        <Section
          title="คำเตือนเรื่องหน่วยกิต"
          icon={<AlertTriangle className="text-red-600" />}
          tone="warn"
        >
          <ul className="space-y-2 text-sm list-disc pl-5">
            <li>หน่วยกิตรวมหลักสูตร: ขั้นต่ำ 124 หน่วยกิต</li>
            <li>หากหน่วยกิตสะสมไม่ถึงตามแผน อาจกระทบการออกสหกิจ/WIL</li>
            <li>ห้ามลงทะเบียนเกิน/ขาด ตามระเบียบของมหาวิทยาลัยในแต่ละเทอม</li>
          </ul>
        </Section>

        <Section title="คำเตือนสำคัญ" icon={<AlertTriangle className="text-amber-600" />} tone="warn">
          <p className="text-sm">
            ข้อมูลในเว็บไซต์นี้จัดทำเพื่อช่วยวางแผนการเรียน
            <strong> เบื้องต้น </strong>
            ก่อนการลงทะเบียนจริงทุกครั้ง โปรดตรวจสอบกับ:
          </p>
          <ul className="mt-2 space-y-1 text-sm list-disc pl-5">
            <li>ประกาศของมหาวิทยาลัย</li>
            <li>เอกสารหลักสูตรอย่างเป็นทางการ</li>
            <li>อาจารย์ที่ปรึกษาวิชาการ</li>
            <li>ฝ่ายทะเบียนของวิทยาลัยการคอมพิวเตอร์</li>
          </ul>
        </Section>
      </div>
    </div>
  );
}

function Section({
  title,
  icon,
  tone = "default",
  children,
}: {
  title: string;
  icon: React.ReactNode;
  tone?: "default" | "warn";
  children: React.ReactNode;
}) {
  return (
    <section
      className={`card p-5 ${
        tone === "warn" ? "border-amber-200 bg-amber-50/40" : ""
      }`}
    >
      <h2 className="text-base font-semibold text-navy-900 flex items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-md bg-white border border-slate-200">
          {icon}
        </span>
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}
