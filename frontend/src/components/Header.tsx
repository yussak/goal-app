import Link from "next/link";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useUser } from "@/contexts/userContext";

export default function Header() {
  const { user } = useUser();

  return (
    <header className="header">
      <LanguageSwitcher />
      <p>{user ? <span>{user.name} としてログイン</span> : "Not logged in"}</p>
      <p>
        {user && (
          <>
            <span>userid（デバッグ用）: {user.id}</span>
            {/* TODO:アイコン追加実装したらアイコン有無で切り替える */}
            {/* 権利とか使用時の条件があると思うので問題ないものに変えるかその条件のことやる */}
            <img src="/defaultIcon.png" alt="icon" />
          </>
        )}
      </p>
    </header>
  );
}
