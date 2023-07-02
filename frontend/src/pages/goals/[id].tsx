import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Goal } from "@/types";

export default function GoalDetail() {
  const [goal, setGoal] = useState<Goal | null>(null);

  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    if (!router.isReady) return;
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + `/goals/${id}`)
      .then(({ data }) => {
        setGoal(data);
      });
  }, [router.isReady]);

  return (
    <>
      <div>
        <h2>目標詳細</h2>
        {goal && (
          <>
            <p>{goal.title}</p>
            <p>{goal.text}</p>
          </>
        )}
      </div>
    </>
  );
}
