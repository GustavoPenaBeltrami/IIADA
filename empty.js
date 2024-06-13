// // seed.js

const { PrismaClient } = require('@prisma/client');

// const prisma = new PrismaClient();
// async function deleteAllData() {
//     try {
//         await prisma.answer.deleteMany()
//         await prisma.section.deleteMany()
//         await prisma.question.deleteMany()
//         await prisma.test.deleteMany()
//         await prisma.enrollment.deleteMany()
//         await prisma.course.deleteMany()

//         console.log("Toda la información ha sido eliminada correctamente.");
//     } catch (error) {
//         console.error("Ocurrió un error al intentar borrar la información:", error);
//     } finally {
//         // Cierra la conexión del cliente Prisma
//         await prisma.$disconnect();
//     }
// }

// // Llama a la función para borrar toda la información
// deleteAllData();

const tableNames = [ 'Answer', 'Question', 'Section', 'UserSectionProgress', 'Test', 'Enrollment',];

const prisma = new PrismaClient();
async function main() {
  for (const tableName of tableNames) await prisma.$queryRawUnsafe(`Truncate "${tableName}" restart identity cascade;`);
}

main().finally(async () => {
  await prisma.$disconnect();
});