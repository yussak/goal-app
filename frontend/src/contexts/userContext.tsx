import { User } from "@/types";
import { createContext } from "react";

interface UserContextType {
  user: User | null;
  login: (user: User) => void;
}

const initialContext: UserContextType = {
  user: null,
  login: () => {},
};

export const UserContext = createContext<UserContextType>(initialContext);
