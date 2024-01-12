import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { axios } from "@/utils/axios";
import { Goal, Milestone, Todo } from "@/types";
import MilestoneForm from "@/components/form/MilestoneForm";
import MilestoneList from "@/components/MilestoneList";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { checkAuth } from "@/utils/checkAuth";

export default function GoalDetail() {
  checkAuth();
  const [goal, setGoal] = useState<Goal | null>(null);

  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [milestoneContent, setMilestoneContent] = useState<string>("");

  const { data: session } = useSession();

  // todosは「キーがstring、バリューがTodo型の配列」のオブジェクトである
  // 各マイルストーンに対するtodoを扱うためキーを使用している
  const [todos, setTodos] = useState<{ [key: string]: Todo[] }>({});

  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    if (router.isReady) {
      getGoalDetails();
      getMilestones();
    }
  }, [router.isReady]);

  useEffect(() => {
    fetchTodos();
  }, [milestones]);

  const getGoalDetails = async () => {
    try {
      const { data } = await axios.get(`/goals/${id}`);
      setGoal(data);
    } catch (error) {
      console.error(error);
    }
  };

  const addMilestone = async () => {
    const params = {
      goal_id: id,
      content: milestoneContent,
      user_id: session?.user?.id,
    };
    try {
      const res = await axios.post(`/goals/${id}/milestones`, params);
      // TODO:これ無駄が多い気がする。state使ったら良くなりそうなので確認（他のところも同じく
      await getMilestones();
      setMilestoneContent("");
    } catch (error) {
      console.error(error);
    }
  };

  const getMilestones = async () => {
    try {
      const { data } = await axios.get(`/goals/${id}/milestones`);
      setMilestones(data);
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMilestone = async (milestone_id: string) => {
    try {
      await axios.delete(`/milestones/${milestone_id}`);
      await getMilestones();
    } catch (error) {
      console.error("asdf", error);
    }
  };

  const fetchTodos = async () => {
    let newTodos = { ...todos };
    for (let milestone of milestones) {
      try {
        const { data } = await axios.get(`/milestones/${milestone.id}/todos`);
        newTodos[milestone.id] = data;
      } catch (error) {
        console.error(error);
      }
    }
    setTodos(newTodos);
  };

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

  const updateTodoCheck = async (todo_id: string, is_completed: boolean) => {
    try {
      await axios.put(`/todos/${todo_id}/is_completed`, { is_completed });
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2>目標詳細</h2>
      {goal && (
        <>
          <Link href={`/goals/edit/${goal.id}`}>edit</Link>
          <p>content: {goal.content}</p>
          <p>purpose: {goal.purpose}</p>
          <p>loss: {goal.loss}</p>
          <p>progress: {goal.progress}</p>
          {/* <p>user_id(デバッグ用): {goal.user_id}</p> */}
          {/* <p>CreatedAt(デバッグ用): {goal.CreatedAt.toString()}</p> */}
          {/* <p>UpdatedAt(デバッグ用): {goal.UpdatedAt.toString()}</p> */}
        </>
      )}
      {session?.user && (
        <>
          <h3>中目標を追加</h3>
          {milestones.length < 5 ? (
            <MilestoneForm
              setContent={setMilestoneContent}
              addMilestone={addMilestone}
              content={milestoneContent}
            />
          ) : (
            <p>中目標は5個までです</p>
          )}
        </>
      )}
      <h3>中目標一覧</h3>
      <MilestoneList
        milestones={milestones}
        onDeleteMilestone={deleteMilestone}
        todos={todos}
        addTodosToState={addTodosToState}
        onDeleteTodo={deleteTodo}
        onUpdateTodoCheck={updateTodoCheck}
      />
    </>
  );
}
