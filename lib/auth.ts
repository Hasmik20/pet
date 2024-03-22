import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./db";
import bcrypt from "bcryptjs";
import { string } from "zod";
import { NextURL } from "next/dist/server/web/next-url";
import { authSchema } from "./zodSchema";

const config = {
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    Credentials({
      // run with login
      // @ts-expect-error
      async authorize(credentials) {
        const validAuthCredentials = authSchema.safeParse(credentials);
        if (!validAuthCredentials.success) {
          return null;
        }
        const { email, password } = validAuthCredentials.data;
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (!user) {
          console.log("wrong email");
          return null;
        }
        const matchedPassword = await bcrypt.compare(
          password,
          user.hashedPassword
        );
        if (!matchedPassword) {
          console.log("Wrong credentials");
          return null;
        }
        return user;
      },
    }),
  ],
  callbacks: {
    // run every request with middleware
    authorized: ({ auth, request }) => {
      const isLoggedIn = Boolean(auth?.user);
      const isTryingAccessApp = request.nextUrl.pathname.includes("/app");

      if (!isLoggedIn && isTryingAccessApp) {
        return false;
      }
      if (isLoggedIn && isTryingAccessApp) {
        return true;
      }
      if (isLoggedIn && !isTryingAccessApp) {
        // if (
        //   request.nextUrl.pathname.includes("sign-in") ||
        //   request.nextUrl.pathname.includes("sign-up")
        // ) {
        //   return Response.redirect(new URL("/payment", request.nextUrl));
        // }
        // return true;
        return Response.redirect(new URL("/app/dashboard", request.nextUrl));
      }
      if (!isLoggedIn && !isTryingAccessApp) {
        return true;
      } else {
        return false;
      }
    },
  },
} satisfies NextAuthConfig;

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(config);
