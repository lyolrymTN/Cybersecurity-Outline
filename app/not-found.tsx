import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page py-24 text-center">
      <p className="font-mono text-xs text-slate-500">404</p>
      <h1 className="mt-2 text-3xl font-semibold text-navy-900">ไม่พบหน้าที่ค้นหา</h1>
      <p className="mt-2 text-slate-600">
        อาจเกิดจากลิงก์ผิด หรือรายวิชาที่ค้นหายังไม่อยู่ในระบบ
      </p>
      <Link href="/" className="btn-primary mt-6">
        กลับหน้าแรก
      </Link>
    </div>
  );
}
