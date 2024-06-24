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
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const userFound = await prisma.user.findUnique({
                    where: {
                        email: credentials.email.toLowerCase()
                    }
                });
                if (!userFound) return null;

                const passwordMatch = await bcrypt.compare(credentials.password, userFound.password);
                if (!passwordMatch) return null;

                return {
                    id: userFound.id,
                    name: userFound.name,
                    lastName: userFound.lastName,
                    email: userFound.email
                };
            }
        }),
    ],
    pages: {
        signIn: "/login"
    },
    callbacks: {
        async jwt({ token, user }) {
            // Si el usuario se autentica, añade `id` y `lastName` al token
            if (user) {
                token.id = user.id;
                token.lastName = user.lastName;
            }
            return token;
        },
        async session({ session, token }) {
            // Añade `id` y `lastName` del token al objeto de sesión
            session.user.id = token.id;
            session.user.lastName = token.lastName;
            return session;
        }
    }
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };