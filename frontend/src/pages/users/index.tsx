import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "@/types";
import Link from "next/link";
import { checkAuth } from "@/utils/auth";
import { NextPageContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useLogin } from "@/hooks/useLogin";

export default function UserIndex({
  user: currentUser,
}: {
  user: User | null;
}) {
  const [users, setUsers] = useState<User[]>([]);
  useLogin(currentUser);

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
              <Link href={`/users/${user.id}`}>detail</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const user = await checkAuth(context);
  const { locale } = context;

  return {
    props: {
      user,
      ...(await serverSideTranslations(locale!, ["common"])),
    },
  };
}
