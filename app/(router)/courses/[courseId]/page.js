import { SingleCoursePage } from "@/components/SingleCoursePage";
import Link from "next/link";

export default function SingleCourseDashboardPage() {
  return (
        <div className="py-5 min-h-[600px]">
        <Link className="text-slate-400 text-xl italic hover:text-slate-500" href="/courses">Return</Link>
        <SingleCoursePage />
    </div>
  );
}