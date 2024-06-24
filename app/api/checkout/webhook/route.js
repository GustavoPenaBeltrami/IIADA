import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import prisma from "@/lib/db";

//MODEL SCHEMA
// model Enrollment {
//     id                  String                @id @default(uuid())
//     paid                Boolean
//     userId              String
//     user                User                  @relation(fields: [userId], references: [id])
//     courseId            String
//     course              Course                @relation(fields: [courseId], references: [id])
//     grades              Grade[]
//     createdAt           DateTime              @default(now())
//     updatedAt           DateTime              @default(now())
//     UserSectionProgress UserSectionProgress[]
//     @@unique([userId, courseId])
// }
// model UserSectionProgress {
//     id           String     @id @default(uuid())
//     sectionId    String
//     section      Section    @relation(fields: [sectionId], references: [id])
//     enrollment   Enrollment @relation(fields: [enrollmentId], references: [id])
//     enrollmentId String
//     finished     Boolean    @default(false)
//     createdAt    DateTime   @default(now())
//     updatedAt    DateTime   @updatedAt
//     @@unique([sectionId]) // Cada usuario solo puede tener un registro de progreso por sección
// }
// model Course {
//     id          String       @id @default(uuid())
//     title       String       @db.Text
//     description String?      @db.Text
//     imageUrl    String?      @db.Text
//     price       Float?
//     sections    Section[]
//     test        Test?
//     enrollments Enrollment[]
//     createdAt   DateTime     @default(now())
//     updatedAt   DateTime     @updatedAt
// }
// model Section {
//     id                  String                @id @default(uuid())
//     title               String                @db.Text
//     description         String?               @db.Text
//     videoUrl            String?               @db.Text
//     duration            Int?
//     number              Int                   @default(autoincrement())
//     courseId            String
//     course              Course                @relation(fields: [courseId], references: [id])
//     createdAt           DateTime              @default(now())
//     updatedAt           DateTime              @updatedAt
//     UserSectionProgress UserSectionProgress[]
// }

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
    const sig = request.headers.get('stripe-signature');
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
        const body = await request.text(); // Para verificar la firma del webhook, necesitamos el cuerpo como texto
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err) {
        console.error(`Webhook Error: ${err.message}`);
        return NextResponse.json({ ok: false, error: 'Webhook error' }, { status: 400 });
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        // Obtener el userId y courseId de la metadata
        const userId = session.metadata.userId;
        const courseId = session.metadata.courseId;

        // Crear un nuevo enrollment
        try {
            const enrollment = await prisma.enrollment.create({
                data: {
                    userId: userId,
                    courseId: courseId,
                    paid: true,
                },
            });

            // Create userProgress records for each lesson in the course
            const boughtCourse = await prisma.course.findUnique({
                where: {
                    id: courseId
                },
                include: {
                    sections: true
                }
            });

            if (boughtCourse.sections.length > 0) {
                await Promise.all(
                    boughtCourse.sections.map((section) => {
                        return prisma.userSectionProgress.create({
                            data: {
                                sectionId: section.id,
                                enrollmentId: enrollment.id,
                                finished: false
                            }
                        });
                    })
                );
            }

        } catch (err) {
            console.error(`Failed to create enrollment: ${err.message}`);
            return NextResponse.json({ ok: false, error: 'Database error' }, { status: 500 });
        }
    }

    return NextResponse.json({ ok: true });
}
