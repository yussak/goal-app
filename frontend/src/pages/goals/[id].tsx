import { useEffect, useState } from "react";
import { axios } from "@/utils/axios";
import { Todo } from "@/types";
import MilestoneForm from "@/components/form/MilestoneForm";
import MilestoneList from "@/components/milestones/MilestoneList";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { CustomNextPage } from "@/types/custom-next-page";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useMilestone } from "@/contexts/mileContext";
import { useGoals } from "@/contexts/goalContext";

const GoalDetail: CustomNextPage = () => {
  const { data: session } = useSession();
  const { goal } = useGoals();
  const { milestones } = useMilestone();
  // // todosは「キーがstring、バリューがTodo型の配列」のオブジェクトである
  // // 各マイルストーンに対するtodoを扱うためキーを使用している
  // const [todos, setTodos] = useState<{ [key: string]: Todo[] }>({});
  const { t } = useTranslation();

  // useEffect(() => {
  //   fetchTodos();
  // }, [milestones]);

  // // todo:todo contextに移動
  // const fetchTodos = async () => {
  //   let newTodos = { ...todos };
  //   for (let milestone of milestones) {
  //     try {
  //       const { data } = await axios.get(`/milestones/${milestone.id}/todos`);
  //       newTodos[milestone.id] = data;
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   setTodos(newTodos);
  // };

  // todo:todo contextに移動

  // addTodo時にstateのtodosを更新する
  // todo:型をちゃんと書く
  const addTodosToState = (milestoneId: string, newTodo: any) => {
    const updatedTodos = {
      ...todos,
      // todo:コメント残す
      [milestoneId]: [...todos[milestoneId], newTodo],
    };
    setTodos(updatedTodos);
  };

  // todo:todo contextに移動

  // TodoListからバケツリレーしてる
  // todo:状態管理ツールで書き換えたい
  // todo:stateでもいけるかもなので確認
  const deleteTodo = async (todo_id: string) => {
    try {
      await axios.delete(`/todos/${todo_id}`);
      await fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  // todo:todo contextに移動
  const updateTodoCheck = async (todo_id: string, isCompleted: boolean) => {
    try {
      await axios.put(`/todos/${todo_id}/isCompleted`, { isCompleted });
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {goal ? (
        <>
          <h2>{t("goal_detail.title1")}</h2>
          {/* todo:このページでも削除可能にしたい */}
          <Button href={`/goals/edit/${goal.id}`} startIcon={<EditIcon />}>
            {t("goal_detail.button1")}
          </Button>
          <p>content: {goal.content}</p>
          <p>purpose: {goal.purpose}</p>
          <p>loss: {goal.loss}</p>
          <p>progress: {goal.progress}</p>
          <p>phase: {goal.phase}</p>
          {/* <p>userId(デバッグ用): {goal.userId}</p> */}
          {/* <p>CreatedAt(デバッグ用): {goal.CreatedAt.toString()}</p> */}
          {/* <p>UpdatedAt(デバッグ用): {goal.UpdatedAt.toString()}</p> */}
          <Link href="/goals">{t("goal_detail.link1")}</Link>
          {session?.user && (
            <>
              {milestones.length < 5 ? (
                <MilestoneForm />
              ) : (
                <p>{t("goal_detail.text1")}</p>
              )}
            </>
          )}
          <h3>{t("goal_detail.title3")}</h3>
          <MilestoneList
            // todos={todos}
            addTodosToState={addTodosToState}
            onDeleteTodo={deleteTodo}
            onUpdateTodoCheck={updateTodoCheck}
          />
        </>
      ) : (
        <p>{t("goal_detail.not_found")}</p>
      )}
    </>
  );
};

export default GoalDetail;
GoalDetail.requireAuth = true;

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
