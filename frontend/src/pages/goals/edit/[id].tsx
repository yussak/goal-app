import EditGoalForm from "@/components/form/EditGoalForm";
import { useLogin } from "@/hooks/useLogin";
import { Goal, User } from "@/types";
import { checkAuth } from "@/utils/auth";
import axios from "axios";
import { NextPageContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditGoal({ user: currentUser }: { user: User | null }) {
  useLogin(currentUser);

  const router = useRouter();
  const id = router.query.id;

  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

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
    if (currentUser !== null) {
      formData.append("user_id", currentUser.id);
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

  return (
    <>
      <h2>目標編集</h2>

      <EditGoalForm
        setTitle={setTitle}
        setText={setText}
        setFile={setFile}
        editGoal={editGoal}
        title={title}
        text={text}
        imageURL={imageURL}
        file={file}
      />
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
