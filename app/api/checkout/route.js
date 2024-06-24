import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import prisma from "@/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
    try {
        const body = await request.json(); // Parsear el cuerpo de la petición
        const { course, userId } = body;

        // Fijarse si no hay un checkout previo
        const existingEnrollment = await prisma.enrollment.findFirst({
            where: {
                courseId: course.id,
                userId: userId
            }
        });

        if (existingEnrollment) {
            return NextResponse.json({ ok: false, error: 'Course already bought' }, { status: 400 });
        }

        const session = await stripe.checkout.sessions.create({
            success_url: 'http://localhost:3000/courses',
            cancel_url: 'http://localhost:3000/courses',
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: course.title
                        },
                        unit_amount: course.price * 100
                    },
                    quantity: 1
                },
            ],
            mode: 'payment',
            metadata: {
                userId: userId,
                courseId: course.id
            }
        });

        return NextResponse.json({ ok: true, url: session.url });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }
}