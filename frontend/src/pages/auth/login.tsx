import { signIn } from "next-auth/react";

export default function Login() {
  /* TODO:見た目整え */
  return (
    <>
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
