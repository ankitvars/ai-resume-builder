import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import LinkedIn from 'next-auth/providers/linkedin';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/prisma';

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!
    }),
    LinkedIn({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!
    })
  ],
  pages: {
    signIn: '/signin',
    error: '/signin'
  },
  secret: process.env.NEXTAUTH_SECRET
});
