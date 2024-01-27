import { AuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    signIn: async () => {
      return true
    }
  }
  // pages: {
  //   signIn: "/login",
  //   error: "/login",
  //   verifyRequest: "/login",
  //   newUser: "/login",
  // },
};

export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}
