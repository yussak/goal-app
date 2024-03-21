import NextAuth from "next-auth";
import axios from "axios";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

// todo:本番デプロイ時にこれでログインできるか確認
// const AUTH_URL = "http://backend:5000/auth/login";
// const AUTH_URL = process.env.BACKEND_URL + "/auth/login";
// const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const apiUrl = process.env.BACKEND_URL;

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const res = await axios.post(AUTH_URL, credentials);
          if (res.data && res.data.user) {
            const user = res.data.user;
            return user;
          } else {
            console.error("Unexpected response:", res.data);
            return Promise.reject("Authorization failed");
          }
        } catch (error) {
          console.error("era-desu", error);
          return Promise.reject(null);
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      const id = user?.id;
      const name = user?.name;
      const email = user?.email;
      try {
        const userExistsResponse = await axios.get(
          `${apiUrl}/auth/user-exists?email=${email}`
        );
        const userExists = userExistsResponse.data.exists;
        let response;
        if (userExists) {
          response = await axios.post(`${apiUrl}/auth/login`, {
            email,
          });
        } else {
          response = await axios.post(`${apiUrl}/auth/signup`, {
            id,
            name,
            email,
          });
        }

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
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user?.id;
        token.name = user?.name;
        token.email = user?.email;
      }
      return token;
    },
    async session({ session, token, user }) {
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
