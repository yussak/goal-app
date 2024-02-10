import { Todo } from "@/types";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TodoForm from "../form/TodoForm";
import { axios } from "@/utils/axios";
import { useSession } from "next-auth/react";
import TodoList from "../TodoList";
import { DeleteDialog } from "../DeleteDialog";
import { useTranslation } from "next-i18next";
import { useMilestone } from "@/contexts/mileContext";
import { useTodos } from "@/contexts/todoContext";

type MilestoneListProps = {
  // todos: { [key: string]: Todo[] };
  onDeleteTodo: (id: string) => void;
  onUpdateTodoCheck: (id: string, checked: boolean) => void;
  addTodosToState: (id: string, newTodo: any) => void;
};

const MilestoneList = ({
  // todos,
  onDeleteTodo,
  onUpdateTodoCheck,
  addTodosToState,
}: MilestoneListProps) => {
  const { data: session } = useSession();
  const { t } = useTranslation();
  const { milestones, deleteMilestone } = useMilestone();
  const { todos } = useTodos();

  // todo:todo contextに移動
  const addTodo = async (parentId: string, content: string) => {
    const params = {
      parentId: parentId,
      userId: session?.user?.id,
      content: content,
    };

    try {
      const res = await axios.post(`/milestones/${parentId}/todos`, params);
      // 親側で更新
      addTodosToState(parentId, res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // todo:mile contextに移動
  // milestoneが持っているtodoが全て完了済みになっているかの判定
  const isMilestoneCompleted = (todos: Todo[]) => {
    if (todos.length === 0) return false;

    for (const todo of todos) {
      if (!todo.isCompleted) {
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
          <li key={index}>
            {/* todo:コンポーネントに分ける */}
            <Accordion>
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
                  {session?.user?.id === milestone.userId && (
                    <p>
                      <DeleteDialog
                        selectedValue={milestone}
                        onDelete={deleteMilestone}
                      />
                    </p>
                  )}
                  {/* <p>milestone_id（デバッグ用）: {milestone.id}</p> */}
                  {/* <p>goal_id（デバッグ用）: {milestone.goal_id}</p> */}
                  {milestoneTodos.length < 5 ? (
                    <TodoForm
                      // 子コンポーネントにaddTodoChildを渡してcontentを受け取る。そのcontentを親（当コンポーネント）のaddTodoで受け取る。その際にmilestone.idも渡し、実行している
                      addTodoChild={(content) => addTodo(milestone.id, content)}
                    />
                  ) : (
                    <span> {t("milestone_list.text1")}</span>
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
    <span>{t("milestone_list.text2")}</span>
  );
};

export default MilestoneList;
