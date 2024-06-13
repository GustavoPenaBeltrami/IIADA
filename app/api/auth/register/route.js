const { NextResponse } = require('next/server');
import bcrypt from 'bcrypt';
import prisma from '@/lib/db';

export async function POST(request) {

    try {
        const data = await request.json();

        const usearExist = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        })

        if (usearExist) {
            return NextResponse.json({ message: 'User already exist' }, { status: 400 });
        }

        const hashPassword = await bcrypt.hash(data.password, 10);
        const user = await prisma.user.create({
            data: {
                email: data.email,
                password: hashPassword,
                name: "",
                lastName: ""
            }
        })
        return NextResponse.json({ ok:true ,message: 'User created'}, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }

}