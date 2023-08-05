import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // ここでバックエンドのAPIを呼び出し、認証を行います。
        // バックエンドはusernameとpasswordを受け取り、ユーザ情報とJWTトークンを返すようにします。

        const res = await fetch("http://localhost:8080/api/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });

        const user = await res.json();

        // If the credentials are valid, return the user object
        if (res.ok) {
          return { ...user };
        }
        // Otherwise, throw an error
        else {
          throw new Error(user.error);
        }
      },
    }),
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token = user;
      }
      return token;
    },
    async session(session, user) {
      session.user = user;
      return session;
    },
  },
});
