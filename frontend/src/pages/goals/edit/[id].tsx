import EditGoalForm from "@/components/form/EditGoalForm";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditGoal() {
  const router = useRouter();
  const id = router.query.id;

  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const { data: session } = useSession();

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
      setImageURL(data.image_url);
    } catch (error) {
      console.error(error);
    }
  };

  const editGoal = async () => {
    const formData = new FormData();
    if (file !== null) {
      formData.append("image", file);
    }
    formData.append("title", title);
    formData.append("text", text);
    if (session?.user?.id) {
      formData.append("user_id", session?.user.id);
    }

    try {
      await axios.put(
        process.env.NEXT_PUBLIC_API_URL + `/goals/edit/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      router.push(`/goals/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteGoalImage = async () => {
    try {
      await axios.delete(process.env.NEXT_PUBLIC_API_URL + `/goal/${id}/image`);
      router.push(`/goals/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2>目標編集</h2>

      <EditGoalForm
        setTitle={setTitle}
        setText={setText}
        setFile={setFile}
        editGoal={editGoal}
        deleteGoalImage={deleteGoalImage}
        title={title}
        text={text}
        imageURL={imageURL}
        file={file}
      />
    </>
  );
}
