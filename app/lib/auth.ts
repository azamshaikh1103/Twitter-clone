import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { EmailProvider } from "next-auth/providers/email";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const NEXT_AUTH = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials: any) {


        console.log(credentials.email);
        const loggedUser = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (loggedUser) {
          console.log("signin cb : ", credentials.email);
          return true;
        }
        else{
          console.log("Sign in first");
          
        }
        return false;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // EmailProvider({
    //   server: process.env.EMAIL_SERVER,
    //   from: process.env.EMAIL_FROM,
    // }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    signIn: async ({ user }) => {
      const loggedUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      if (loggedUser) {
        console.log("signin cb : ", user.email);
        return true;
      }

      return false;
    },
    session: ({ session, token, user }) => {
      session.user.id = token.sub;
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};
