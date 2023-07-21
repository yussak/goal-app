import { Goal } from "@/types";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditGoal() {
  const router = useRouter();
  const id = router.query.id;

  const [goal, setGoal] = useState<Goal | null>(null);

  useEffect(() => {
    if (router.isReady) {
      getGoal();
    }
  }, [router.isReady]);

  const getGoal = async () => {
    try {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + `/goals/${id}`
      );
      setGoal(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <p>編集ページ</p>
      <p>id: {id}</p>
    </>
  );
}
