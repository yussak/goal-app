import NextAuth from "next-auth";
import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const res = await axios.post(
            "http://backend:8080/auth/login",
            credentials
          );
          if (res.data && res.data.user) {
            const user = res.data.user;
            return Promise.resolve(user);
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
  session: {
    jwt: true,
  },
});
