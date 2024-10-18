import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            authorize: async (credentials: Record<"password" | "username", string> | undefined) => {
                if (!credentials) {
                    return null;
                }

                const user = await prisma.auth.findFirst({
                    where: { username: credentials.username },
                });

                if (!user || credentials.password !== user.password) {
                return null;
                }

                return { id: user.id.toString(), name: user.username };
            },
        }),
    ],
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async session({ session, user }) {
            session.user = user;
            return session;
        },
        async redirect({ baseUrl }) {
            return baseUrl + '/timesheet';
        },
    },
});