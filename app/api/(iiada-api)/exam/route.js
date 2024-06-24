import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(request) {
    try {
        // Obtener los parámetros de búsqueda de la URL
        const searchParams = request.nextUrl.searchParams;
        const courseId = searchParams.get('courseId');

        // 1. Buscar el test asociado con el curso
        const tests = await prisma.test.findMany({
            where: { courseId: courseId },
            include: {
                questions: {
                    include: {
                        answers: {
                            select: {
                                id: true,
                                text: true,
                                // Excluir isCorrect
                                // isCorrect: false // This is not a valid Prisma option, so we handle it manually in the response
                            }
                        }
                    }
                }
            }
        });

        // 2. Verificar si existen tests asociados
        if (tests.length === 0) {
            return NextResponse.json({ message: 'No tests found for this course', status: 404 });
        }

        // 3. Filtrar las respuestas para no incluir isCorrect
        const filteredTests = tests.map(test => ({
            ...test,
            questions: test.questions.map(question => ({
                ...question,
                answers: question.answers.map(({ id, text }) => ({
                    id,
                    text
                }))
            }))
        }));

        // 4. Retornar los tests encontrados sin isCorrect
        return NextResponse.json({ ok: true, status: 200, tests: filteredTests });
    } catch (error) {
        console.error('Error fetching tests:', error);
        return NextResponse.json({
            message: error.message,
            status: 500
        });
    }
}

export async function POST(request) {
    try {
        const { courseId, answers } = await request.json();

        // 1. Obtener las preguntas y respuestas correctas para el curso dado
        const tests = await prisma.test.findMany({
            where: { courseId: courseId },
            include: {
                questions: {
                    include: {
                        answers: true
                    }
                }
            }
        });

        if (tests.length === 0) {
            return NextResponse.json({ message: 'No tests found for this course', status: 404 });
        }

        // 2. Verificar las respuestas enviadas
        let correctAnswers = 0;
        let totalQuestions = 0;

        tests.forEach(test => {
            test.questions.forEach(question => {
                totalQuestions++;
                const correctAnswer = question.answers.find(answer => answer.isCorrect);
                const userAnswer = answers.find(ans => ans.questionId === question.id);

                if (userAnswer && userAnswer.answerId === correctAnswer.id) {
                    correctAnswers++;
                }
            });
        });

        const score = (correctAnswers / totalQuestions) * 100;

        // 3. Retornar el resultado de la verificación
        return NextResponse.json({
            ok: true,
            status: 200,
            score,
            correctAnswers,
            totalQuestions
        });
    } catch (error) {
        console.error('Error verifying answers:', error);
        return NextResponse.json({
            message: error.message,
            status: 500
        });
    }
}