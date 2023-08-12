import { useEffect, useState } from "react";
import { axios } from "@/utils/axios";
import { User } from "@/types";
import Link from "next/link";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const { data } = await axios.get("/users");
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
              <Link href={`/users/${user.id}`}>detail</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
