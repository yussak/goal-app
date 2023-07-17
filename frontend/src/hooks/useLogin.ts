import { useEffect } from "react";
import { useUser } from "@/contexts/userContext";
import { User } from "@/types";

export function useLogin(currentUser: User | null) {
  const { login } = useUser();

  useEffect(() => {
    if (currentUser) {
      login(currentUser);
    }
  }, [currentUser, login]);
}
