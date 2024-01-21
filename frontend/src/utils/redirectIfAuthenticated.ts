import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function redirectIfAuthenticated() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading" || !session) return;
    if (
      router.pathname === "/auth/login" ||
      router.pathname === "/auth/signup"
    ) {
      router.push("/");
    }
  }, [session, status, router.pathname]);
}
