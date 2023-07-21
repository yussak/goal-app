import { Button, Container, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditGoal() {
  const router = useRouter();
  const id = router.query.id;

  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");

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
      setTitle(data.title);
      setText(data.text);
    } catch (error) {
      console.error(error);
    }
  };

  const editGoal = async () => {
    //
  };

  return (
    <>
      {/* TODO:コンポーネント化 */}
      <h2>目標編集</h2>
      <Container sx={{ pt: 3 }}>
        <Stack spacing={2}>
          <TextField
            label="title"
            value={title}
            defaultValue={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button onClick={editGoal} variant="contained">
            更新
          </Button>
        </Stack>
      </Container>
    </>
  );
}
