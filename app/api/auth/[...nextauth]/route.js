import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/db";
import bcrypt from "bcrypt";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: {  label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const userFound = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })
                if (!userFound) return null

                const passwordMatch = await bcrypt.compare(credentials.password, userFound.password)
                if (!passwordMatch) return null

                return {
                    id: userFound.id,
                    name: userFound.name,
                    email: userFound.email
                }
            }
        }),
    ],
    pages: {
        signIn: "/login"
    }
}


export const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}