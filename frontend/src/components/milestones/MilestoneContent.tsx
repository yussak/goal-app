import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import TodoList from "../TodoList";
import TodoForm from "../form/TodoForm";
import { DeleteDialog } from "../DeleteDialog";
import { useMilestone } from "@/contexts/mileContext";
import { useTodos } from "@/contexts/todoContext";
import { Milestone, Todo } from "@/types";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type props = {
  milestone: Milestone;
  milestoneTodos: Todo[];
  isAllCompleted: boolean;
};

const MilestoneContent = ({
  milestone,
  milestoneTodos,
  isAllCompleted,
}: props) => {
  const { t } = useTranslation();
  const { data: session } = useSession();
  const { deleteMilestone } = useMilestone();
  const { addTodo, deleteTodo, updateTodoCheck } = useTodos();

  return (
    <>
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
              onDeleteTodo={deleteTodo}
              onUpdateTodoCheck={updateTodoCheck}
            />
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default MilestoneContent;
