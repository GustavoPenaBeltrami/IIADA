import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function PUT(request) {
    try {
        const {sectionId} = await request.json();
        // 1. Actualizar el progreso de la sección
        const updatedProgress = await prisma.userSectionProgress.update({
            where: {
                id: sectionId
            },
            data: {
                finished: true
            }
        });
        return NextResponse.json({ ok: true, status: 200, updatedProgress });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: error.message, status: 500
        });
    }
}