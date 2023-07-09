import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "@/types";

export default function UserIndex() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "/users"
      );
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2>ユーザー一覧</h2>
      <ul>
        {users.map((user, index) => {
          return (
            <li key={index}>
              <p>id(デバッグ用): {user.id}</p>
              <p>name: {user.name}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
}
