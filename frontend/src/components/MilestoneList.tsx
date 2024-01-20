import { Milestone, Todo } from "@/types";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TodoForm from "./form/TodoForm";
import { axios } from "@/utils/axios";
import { useSession } from "next-auth/react";
import TodoList from "./TodoList";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

type MilestoneListProps = {
  milestones: Milestone[];
  todos: { [key: string]: Todo[] };
  onDeleteMilestone: (id: string) => void;
  onDeleteTodo: (id: string) => void;
  onUpdateTodoCheck: (id: string, checked: boolean) => void;
  addTodosToState: (id: string, newTodo: any) => void;
};

const MilestoneList = ({
  milestones,
  todos,
  onDeleteMilestone,
  onDeleteTodo,
  onUpdateTodoCheck,
  addTodosToState,
}: MilestoneListProps) => {
  const { data: session } = useSession();

  const addTodo = async (parent_id: string, content: string) => {
    const params = {
      parent_id: parent_id,
      user_id: session?.user?.id,
      content: content,
    };

    try {
      const res = await axios.post(`/milestones/${parent_id}/todos`, params);
      // 親側で更新
      addTodosToState(parent_id, res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // milestoneが持っているtodoが全て完了済みになっているかの判定
  const isMilestoneCompleted = (todos: Todo[]) => {
    if (todos.length === 0) return false;

    for (const todo of todos) {
      if (!todo.is_completed) {
        return false;
      }
    }

    return true;
  };

  return milestones && milestones.length > 0 ? (
    <ul>
      {milestones.map((milestone, index) => {
        const milestoneTodos = todos[milestone.id] || [];
        const isAllCompleted = isMilestoneCompleted(milestoneTodos);
        return (
          // todo:milestone中身をコンポーネントに切り出す
          <li key={index}>
            <Accordion defaultExpanded={isAllCompleted}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography component="div">
                  {isAllCompleted ? (
                    <span className="text-border">{milestone.content}</span>
                  ) : (
                    milestone.content
                  )}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {/* <div> cannot appear as a descendant of <p> の対策の為divタグに変更している*/}
                <Typography component="div">
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => onDeleteMilestone(milestone.id)}
                    startIcon={<DeleteOutlineIcon />}
                  >
                    delete
                  </Button>
                  {/* <p>milestone_id（デバッグ用）: {milestone.id}</p> */}
                  {/* <p>goal_id（デバッグ用）: {milestone.goal_id}</p> */}
                  {milestoneTodos.length < 5 ? (
                    <TodoForm
                      // 子コンポーネントにaddTodoChildを渡してcontentを受け取る。そのcontentを親（当コンポーネント）のaddTodoで受け取る。その際にmilestone.idも渡し、実行ている
                      addTodoChild={(content) => addTodo(milestone.id, content)}
                    />
                  ) : (
                    <span>todoは5個まで追加できます</span>
                  )}

                  {/* todosをマイルストーンのものに絞って渡す */}
                  <TodoList
                    todos={milestoneTodos}
                    milestoneId={milestone.id}
                    onDeleteTodo={onDeleteTodo}
                    onUpdateTodoCheck={onUpdateTodoCheck}
                  />
                </Typography>
              </AccordionDetails>
            </Accordion>
          </li>
        );
      })}
    </ul>
  ) : (
    <span>中目標はありません</span>
  );
};

export default MilestoneList;
