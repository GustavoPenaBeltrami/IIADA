const { NextResponse } = require('next/server');
import bcrypt from 'bcrypt';
import prisma from '@/lib/db';

export async function POST(request) {

    try {
        const data = await request.json();

        const userExist = await prisma.user.findUnique({
            where: {
                email: data.email.toLowerCase()
            }
        })

        if (userExist) {
            return NextResponse.json({ message: 'User already exist' }, { status: 400 });
        }

        const hashPassword = await bcrypt.hash(data.password, 10);

        function capitalizeWords(str) {
            return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        }

        const fixedName = capitalizeWords(data.name);
        const fidexLastnames = capitalizeWords(data.lastName);
        const user = await prisma.user.create({
            data: {
                email: data.email.toLowerCase(),
                password: hashPassword,
                name: fixedName,
                lastName: fidexLastnames
            }
        })
        return NextResponse.json({ ok:true ,message: 'User created'}, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }

}