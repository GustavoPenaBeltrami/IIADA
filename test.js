// updateCourse.js
// Actualizar el Test para conectarlo con el Course
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function connectTestToCourse() {
  try {
    const updatedTest = await prisma.test.update({
      where: {
        id: "30dfa5d0-5662-4fdf-bdb6-fd6817f7c0d0", // ID del Test
      },
      data: {
        course: {
          connect: {
            id: "04aee05c-2d69-4030-b250-4b67f34396a9", // ID del Course
          },
        },
      },
    });
  } catch (error) {
    console.error("Error connecting test to course:", error);
  } finally {
    await prisma.$disconnect();
  }
}

connectTestToCourse();