import { checkAuth } from "@/utils/checkAuth";

export default function About() {
  checkAuth();

  return (
    <>
      <div>about</div>
      <p>ここにはアプリの使い方を書く予定</p>
    </>
  );
}
