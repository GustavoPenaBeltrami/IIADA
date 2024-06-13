import { CoursePublicInfo } from "@/components/CoursePublicInfo";
import Link from 'next/link'

export default function CoursesPage() {
    return (
    <div className="py-5 min-h-[600px]">
        <Link className="text-slate-400 text-xl italic hover:text-slate-500" href="/catalog">Return</Link>
        <CoursePublicInfo />
    </div>
    )

}