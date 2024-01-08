import NextAuth from "next-auth";
import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

// todo:本番でも使えるようにしないといけない
// todo:これ消せないか確認
const AUTH_URL = "http://backend:5000/auth/login";

export default NextAuth({
  // todo:これ消せないか確認
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  // todo:これ消せないか確認
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  // todo:これ消せないか確認
  session: {
    jwt: true,
  },
});
