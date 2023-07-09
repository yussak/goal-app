import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { User } from "@/types";

export default function UserDetail() {
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    if (!router.isReady) return;
    getUserDetails();
  }, [router.isReady]);

  const getUserDetails = async () => {
    try {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + `/users/${id}`
      );
      setUser(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2>ユーザー詳細</h2>
      {user && (
        <>
          <p>name: {user.name}</p>
        </>
      )}
    </>
  );
}
