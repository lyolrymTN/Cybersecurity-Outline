import { notFound } from "next/navigation";
import { courses, getCourse } from "@/lib/data";
import { CourseDetailView } from "@/components/CourseDetailView";

export async function generateStaticParams() {
  return courses.map((c) => ({ id: c.id }));
}

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const course = getCourse(params.id);
  if (!course) return notFound();
  return <CourseDetailView course={course} />;
}
