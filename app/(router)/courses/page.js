import { MyCourses } from "@/components/MyCourses";

export default function CoursesPage() {
  return (
    <>
      <h1 className="text-[38px] font-bold mt-10 mb-6 custom-black">My enrolled courses</h1>
      <MyCourses />
    </>
  );
}