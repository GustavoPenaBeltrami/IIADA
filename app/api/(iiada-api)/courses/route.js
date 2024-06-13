import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(request) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const email = searchParams.get('email');

        // 1. Buscar al usuario por su correo electrónico
        const user = await prisma.user.findUnique({
            where: { email: email },
            include: {
                enrollments: {
                    where: {
                        paid: true // Filtrar solo las inscripciones pagadas
                    },
                    include: {
                        course: true, // Incluir detalles del curso
                        UserSectionProgress: { // Incluir progreso de sección del usuario
                            include: {
                                section: true // Incluir datos de la sección asociada
                            }
                        }
                    }
                }
            }
        });

        if (!user) {
            return NextResponse.json({ message: 'User not found', status: 404 });
        }

        // 2. Obtener todos los cursos del usuario con sus respectivos progresos de sección
        const coursesWithProgress = user.enrollments.map(enrollment => {
            return {
                course: enrollment.course,
                userSectionProgress: enrollment.UserSectionProgress
            };
        });

        return NextResponse.json({ ok: true, status: 200, courses: coursesWithProgress });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: error.message, status: 500
        });
    }
}
