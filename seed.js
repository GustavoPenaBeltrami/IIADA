// seed.js

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seed() {

    // Crear curso
    const course = await prisma.course.create({
        data: {
            title: "Pre licencing education course",
        },
    });

    // Crear secciones para el curso
    const sections = await prisma.section.createMany({
        data: [
            {
                title: "Introduction",
                description: "In this section, we will cover the basics of the new law and its requirements for dealerships in the state of Indiana. We will discuss the purpose of the law, who it applies to, and the penalties for non-compliance.",
                videoUrl: "https://streamable.com/pdvro6",
                duration: 58,
                number: 1,
                courseId: course.id,
            },
            {
                title: "Stop Sale Directives",
                description: "This section covers the requirements for issuing and complying with stop-sale directives under the new law. We will discuss what constitutes a stop-sale directive, who can issue one, and the consequences of non-compliance.",  
                videoUrl: "https://streamable.com/pdvro6",
                duration: 58,
                number: 2,
                courseId: course.id,
            },
            {
                title: "Licensee Requirements",
                description: "In this section, we will cover the requirements for obtaining and maintaining a dealer license under the new law. We will discuss the bond amount required, the records that must be maintained, and the penalties for non-compliance.",
                videoUrl: "https://streamable.com/pdvro6",
                duration: 58,
                number: 3,
                courseId: course.id,
            },
            {
                title: "Dealer Records",
                description: "This section covers the record-keeping requirements for dealerships under the new law. We will discuss the types of records that must be maintained, how long they must be kept, and the penalties for non-compliance.",
                videoUrl: "https://streamable.com/pdvro6",
                duration: 58,
                number: 4,
                courseId: course.id,
            },
            {
                title: "Outro",
                description: "In this section, we will review the key points covered in the course and provide additional resources for further information. We will also discuss the importance of compliance with the new law and the consequences of non-compliance.",
                videoUrl: "https://streamable.com/pdvro6",
                duration: 58,
                number: 5,
                courseId: course.id,
            },
        ],
    
    });

    // Crear test asociado al curso
    const test = await prisma.test.create({
        data: {
            courseId: "course.id",
        },
    });


    // Crear preguntas
    const questionsCreated = await prisma.question.createMany({
        data: [
            {
                text: "What constitutes a 'stop sale directive' under the new law?",
                number: 1,
                testId: test.id,
            },
            {
                text: "Who issues a stop-sale directive according to the new law?",
                number: 2,
                testId: test.id,
            },
            {
                text: "What is the required bond amount for a licensee?",
                number: 3,
                testId: test.id,
            },
            {
                text: "How long must dealer records be maintained at the place of business?",
                number: 4,
                testId: test.id,
            },
            {
                text: "What is the purpose of adding separate line items for items not included in the advertised sale price in the contract for sale or lease?",
                number: 5,
                testId: test.id,
            },
            {
                text: "Who must sign a written acknowledgment of receipt of the disclosure when selling a rebuilt or salvage vehicle?",
                number: 6,
                testId: test.id,
            },
            {
                text: "What happens if a dealer fails to disclose that a vehicle is a rebuilt or salvage vehicle?",
                number: 7,
                testId: test.id,
            },
            {
                text: "What records must a dealer maintain  in their deal jackets?",
                number: 8,
                testId: test.id,
            },
            {
                text: "After the period identified in question 4, how much longer must dealer records be maintained, whether on or offsite?",
                number: 9,
                testId: test.id,
            },
            {
                text: "What is the purpose of the bond required for a licensee?",
                number: 10,
                testId: test.id,
            },
            {
                text: 'What must a dealer provide when selling a vehicle "as-is"?',
                number: 11,
                testId: test.id,
            },
            {
                text: "How often must a dealership's insurance policy be renewed?",
                number: 12,
                testId: test.id,
            },
            {
                text: "How should a dealership handle a situation where a sold vehicle is found to have undisclosed mechanical issues?",
                number: 13,
                testId: test.id,
            },
            {
                text: "What is required for a dealership to offer financing options to customers?",
                number: 14,
                testId: test.id,
            },
            {
                text: "What is required for a dealership to legally display vehicles for sale?",
                number: 15,
                testId: test.id,
            },
            {
                text: "What must a dealer do when there is a manufacturer recall on a vehicle in their inventory?",
                number: 16,
                testId: test.id,
            },
            {
                text: "How many days does a dealer have to provide title to a consumer?",
                number: 17,
                testId: test.id,
            },
            {
                text: "When may a second interim plate be issued to a consumer by a Dealer?",
                number: 18,
                testId: test.id,
            },
            {
                text: "When may a customer use a dealer license plate?",
                number: 19,
                testId: test.id,
            },
            {
                text: "What is an acceptable form of proof of title delivery for a dealer to retain?",
                number: 20,
                testId: test.id,
            }
        ]
    })

    //buscar todas las preguntas
    const questions = await prisma.question.findMany();
    //ordenar questions por number
    questions.sort((a, b) => a.number - b.number);

    const answers = await prisma.answer.createMany({
        data: [
            {
                text: "Notification issued by a dealership",
                isCorrect: false,
                questionId: questions[0].id,
            },
            {
                text: "Notification issued by a manufacturer or distributor",
                isCorrect: true,
                questionId: questions[0].id,
            },
            {
                text: "Notification issued by a consumer advocacy group",
                isCorrect: false,
                questionId: questions[0].id,
            },
            {
                text: "None of the above",
                isCorrect: false,
                questionId: questions[0].id,
            },
            {
                text: "All of the above",
                isCorrect: false,
                questionId: questions[0].id,
            },
            {
                text: "State government agencies",
                isCorrect: false,
                questionId: questions[1].id,
            },
            {
                text: "Local zoning authorities",
                isCorrect: false,
                questionId: questions[1].id,
            },
            {
                text: "Manufacturer or distributor",
                isCorrect: true,
                questionId: questions[1].id,
            },
            {
                text: "None of the above",
                isCorrect: false,
                questionId: questions[1].id,
            },
            {
                text: "All of the above",
                isCorrect: false,
                questionId: questions[1].id,
            },
            {
                text: "$10,000",
                isCorrect: false,
                questionId: questions[2].id,
            },
            {
                text: "$15,000",
                isCorrect: false,
                questionId: questions[2].id,
            },
            {
                text: "$25,000",
                isCorrect: true,
                questionId: questions[2].id,
            },
            {
                text: "$30,000",
                isCorrect: false,
                questionId: questions[2].id,
            },
            {
                text: "$50,000",
                isCorrect: false,
                questionId: questions[2].id,
            },
            {
                text: "1 year",
                isCorrect: false,
                questionId: questions[3].id,
            },
            {
                text: "2 years",
                isCorrect: true,
                questionId: questions[3].id,
            },
            {
                text: "5 years",
                isCorrect: false,
                questionId: questions[3].id,
            },
            {
                text: "None of the above",
                isCorrect: false,
                questionId: questions[3].id,
            },
            {
                text: "All of the above",
                isCorrect: false,
                questionId: questions[3].id,
            },
            {
                text: "To ensure transparency and clarity in pricing",
                isCorrect: true,
                questionId: questions[4].id,
            },
            {
                text: "To hide additional fees",
                isCorrect: false,
                questionId: questions[4].id,
            },
            {
                text: "To confuse buyers",
                isCorrect: false,
                questionId: questions[4].id,
            },
            {
                text: "None of the above",
                isCorrect: false,
                questionId: questions[4].id,
            },
            {
                text: "All of the above",
                isCorrect: false,
                questionId: questions[4].id,
            },
            {
                text: "Manufacturer",
                isCorrect: false,
                questionId: questions[5].id,
            },
            {
                text: "Dealer",
                isCorrect: false,
                questionId: questions[5].id,
            },
            {
                text: "Purchaser, customer, or transferee",
                isCorrect: true,
                questionId: questions[5].id,
            },
            {
                text: "None of the above",
                isCorrect: false,
                questionId: questions[5].id,
            },
            {
                text: "All of the above",
                isCorrect: false,
                questionId: questions[5].id,
            },
            {
                text: "They may receive a warning",
                isCorrect: false,
                questionId: questions[6].id,
            },
            {
                text: "They may lose their license",
                isCorrect: false,
                questionId: questions[6].id,
            },
            {
                text: "It constitutes an unfair practice",
                isCorrect: false,
                questionId: questions[6].id,
            },
            {
                text: "They may be fined $1,000 per instance",
                isCorrect: false,
                questionId: questions[6].id,
            },
            {
                text: "All of the above",
                isCorrect: true,
                questionId: questions[6].id,
            },
            {
                text: "Bill of sale, proof of title delivery, odometer disclosure statement",
                isCorrect: false,
                questionId: questions[7].id,
            },
            {
                text: "Copy of reassigned title, FTC Buyer’s Guide, title affidavit, ST-108",
                isCorrect: false,
                questionId: questions[7].id,
            },
            {
                text: "Interim plates generated in error, copy of rebuilt/salvage disclosure (if applicable), flood damage affidavit (if applicable)",
                isCorrect: false,
                questionId: questions[7].id,
            },
            {
                text: "Sales receipt from auction, finance agreement, and any additional deal documents",
                isCorrect: false,
                questionId: questions[7].id,
            },
            {
                text: "All of the above",
                isCorrect: true,
                questionId: questions[7].id,
            },
            {
                text: "1 year",
                isCorrect: false,
                questionId: questions[8].id,
            },
            {
                text: "2 years",
                isCorrect: false,
                questionId: questions[8].id,
            },
            {
                text: "3 years",
                isCorrect: true,
                questionId: questions[8].id,
            },
            {
                text: "None of the above",
                isCorrect: false,
                questionId: questions[8].id,
            },
            {
                text: "All of the above",
                isCorrect: false,
                questionId: questions[8].id,
            },
            {
                text: "To cover operating expenses",
                isCorrect: false,
                questionId: questions[9].id,
            },
            {
                text: "To secure payment of fines, penalties, costs, fees, and damages",
                isCorrect: true,
                questionId: questions[9].id,
            },
            {
                text: "To provide additional revenue for the state",
                isCorrect: false,
                questionId: questions[9].id,
            },
            {
                text: "None of the above",
                isCorrect: false,
                questionId: questions[9].id,
            },
            {
                text: "All of the above",
                isCorrect: false,
                questionId: questions[9].id,
            },
            {
                text: "A warranty certificate",
                isCorrect: false,
                questionId: questions[10].id,
            },
            {
                text: "Federal Buyer’s Guide",
                isCorrect: true,
                questionId: questions[10].id,
            },
            {
                text: "A free maintenance service",
                isCorrect: false,
                questionId: questions[10].id,
            },
            {
                text: "None of the above",
                isCorrect: false,
                questionId: questions[10].id,
            },
            {
                text: "All of the above",
                isCorrect: false,
                questionId: questions[10].id,
            },
            {
                text: "Every six months",
                isCorrect: false,
                questionId: questions[11].id,
            },
            {
                text: "Annually",
                isCorrect: true,
                questionId: questions[11].id,
            },
            {
                text: "Every two years",
                isCorrect: false,
                questionId: questions[11].id,
            },
            {
                text: "None of the above",
                isCorrect: false,
                questionId: questions[11].id,
            },
            {
                text: "All of the above",
                isCorrect: false,
                questionId: questions[11].id,
            },
            {
                text: "Deny responsibility",
                isCorrect: false,
                questionId: questions[12].id,
            },
            {
                text: "Offer to repair the vehicle or provide compensation",
                isCorrect: true,
                questionId: questions[12].id,
            },
            {
                text: "Delegate the claim to the manufacturer",
                isCorrect: false,
                questionId: questions[12].id,
            },
            {
                text: "None of the above",
                isCorrect: false,
                questionId: questions[12].id,
            },
            {
                text: "All of the above",
                isCorrect: false,
                questionId: questions[12].id,
            },
            {
                text: "A partnership with a local bank",
                isCorrect: false,
                questionId: questions[13].id,
            },
            {
                text: "A state-issued finance license",
                isCorrect: true,
                questionId: questions[13].id,
            },{
                text: "A financial advisor on staff",
                isCorrect: false,
                questionId: questions[13].id,
            },
            {
                text: "None of the above",
                isCorrect: false,
                questionId: questions[13].id,
            },
            {
                text: "All of the above",
                isCorrect: false,
                questionId: questions[13].id,
            },
            {
                text: "A license for each vehicle",
                isCorrect: false,
                questionId: questions[14].id,
            },
            {
                text: "A dealer license issued by the Secretary of State",
                isCorrect: true,
                questionId: questions[14].id,
            },
            {
                text: "An endorsement from a manufacturer",
                isCorrect: false,
                questionId: questions[14].id,
            },
            {
                text: "None of the above",
                isCorrect: false,
                questionId: questions[14].id,
            },
            {
                text: "All of the above",
                isCorrect: false,
                questionId: questions[14].id,
            },
            {
                text: "Remove the vehicle from sale until repairs are made",
                isCorrect: true,
                questionId: questions[15].id,
            },
            {
                text: "Continue to sell the vehicle as is with a warning",
                isCorrect: false,
                questionId: questions[15].id,
            },
            {
                text: "Inform the customer to handle the recall after purchase",
                isCorrect: false,
                questionId: questions[15].id,
            },
            {
                text: "None of the above",
                isCorrect: false,
                questionId: questions[15].id,
            },
            {
                text: "All of the above",
                isCorrect: false,
                questionId: questions[15].id,
            },
            {
                text: "Twenty-one",
                isCorrect: false,
                questionId: questions[16].id,
            },
            {
                text: "Thirty-one",
                isCorrect: true,
                questionId: questions[16].id,
            },
            {
                text: "Forty-five",
                isCorrect: false,
                questionId: questions[16].id,
            },
            {
                text: "None of the above",
                isCorrect: false,
                questionId: questions[16].id,
            },
            {
                text: "All of the above",
                isCorrect: false,
                questionId: questions[16].id,
            },
            {
                text: "After 31 days",
                isCorrect: false,
                questionId: questions[17].id,
            },
            {
                text: "After 45 days",
                isCorrect: false,
                questionId: questions[17].id,
            },
            {
                text: "After a complaint is received by the Auto Dealer Services Division",
                isCorrect: false,
                questionId: questions[17].id,
            },
            {
                text: "None of the above",
                isCorrect: true,
                questionId: questions[17].id,
            },
            {
                text: "All of the above",
                isCorrect: false,
                questionId: questions[17].id,
            },
            {
                text: "When they are experiencing a delay in title delivery",
                isCorrect: false,
                questionId: questions[18].id,
            },
            {
                text: "For up to 45 days after the date of sale.",
                isCorrect: false,
                questionId: questions[18].id,
            },
            {
                text: "For up to ten days prior to a sale as part of a test drive",
                isCorrect: true,
                questionId: questions[18].id,
            },
            {
                text: "None of the above",
                isCorrect: false,
                questionId: questions[18].id,
            },
            {
                text: "All of the above",
                isCorrect: false,
                questionId: questions[18].id,
            },
            {
                text: "A deal jacket that has been signed and dated by the customer and dealer acknowledging delivery and receipt of title",
                isCorrect: false,
                questionId: questions[19].id,
            },
            {
                text: "A receipt for certified mail delivery to the mailing address that the consumer provided",
                isCorrect: false,
                questionId: questions[19].id,
            },
            {
                text: "A receipt from a title processor or the BMV directly.",
                isCorrect: false,
                questionId: questions[19].id,
            },
            {
                text: "None of the above",
                isCorrect: false,
                questionId: questions[19].id,
            },
            {
                text: "All of the above",
                isCorrect: true,
                questionId: questions[19].id,
            },
        ]
    });
}

seed()
    .then(() => {
        console.log('Data seeded successfully');
    })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
