import { signIn } from "next-auth/react";

export default function signup() {
  /* TODO:見た目整え */
  return <button onClick={() => signIn()}>新規登録</button>;
}
