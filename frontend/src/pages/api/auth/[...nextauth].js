import NextAuth from "next-auth";
import axios from "axios";
import GoogleProvider from "next-auth/providers/google";

// todo:本番デプロイ時にこれでログインできるか確認
const API_URL = process.env.BACKEND_URL;

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async signIn({ user }) {
      const id = user?.id;
      const name = user?.name;
      const email = user?.email;
      try {
        const userExistsResponse = await axios.post(
          `${API_URL}/auth/user-exists`,
          { email }
        );

        const userExists = userExistsResponse.data.exists;

        let response;
        if (!userExists) {
          response = await axios.post(`${API_URL}/auth/signup`, {
            id,
            name,
            email,
          });
        }
        response = await axios.post(`${API_URL}/auth/login`, {
          email,
        });

        if (response.status === 200) {
          const userData = response.data.user;
          if (userData) {
            user.id = userData.id;
            user.name = userData.name;
            user.email = userData.email;
          }
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log("An Error occurred: ", error);
        return false;
      }
    },
    async redirect({ baseUrl }) {
      return baseUrl;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user?.id;
        token.name = user?.name;
        token.email = user?.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      return session;
    },
  },
  session: {
    jwt: true,
    strategy: "jwt",
  },
});
