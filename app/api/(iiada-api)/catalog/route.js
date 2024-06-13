
import { NextResponse } from "next/server"
import prisma from "@/lib/db"

export async function GET(request) {

    const searchParams = request.nextUrl.searchParams;
    const courseId = searchParams.get('courseId');

    try {
        if (courseId){
            const course = await prisma.course.findUnique({
                where: { id: courseId },
                include: {
                    sections: {
                        select: {
                            title: true,
                            description: true
                        }
                    }
                }
            })
    
            if (!course) {
                return NextResponse.json({ message: 'Course not found', status: 404 })
            }
    
            return NextResponse.json({ ok: true, status: 200, course })
        }

        const courses = await prisma.course.findMany();
        if (!courses) {
            return NextResponse.json({ message: 'Courses not found', status: 404 })
        }
        
        return NextResponse.json({ ok: true, status: 200, courses })


    } catch (error) {
        console.error(error)
        return NextResponse.json({
            message: error.message, status: 500
        })
    }
}