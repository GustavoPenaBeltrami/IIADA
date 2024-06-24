import { SingleCoursePage } from "@/components/SingleCoursePage";
import Link from "next/link";

export default function SingleCourseDashboardPage() {
  return (
        <div className="py-5 min-h-[600px]">
        <Link className="bg-custom text-white py-2 px-4 flex gap-2 w-fit rounded-md" href="/courses"><span>&#8592;</span> <p>Return</p></Link>
        <SingleCoursePage />
    </div>
  );
}