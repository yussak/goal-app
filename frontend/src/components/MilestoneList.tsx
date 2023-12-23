import { Milestone, Todo } from "@/types";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TodoForm from "./form/TodoForm";
import { useState } from "react";
import { axios } from "@/utils/axios";
import { useSession } from "next-auth/react";

type MilestoneListProps = {
  milestones: Milestone[];
  todos: { [key: string]: Todo[] };
  onDelete: (id: string) => void;
  addTodosToState: (id: string, newTodo: any) => void;
};

const MilestoneList = ({
  milestones,
  todos,
  onDelete,
  addTodosToState,
}: MilestoneListProps) => {
  const { data: session } = useSession();

  const [todoContent, setTodoContent] = useState<string>("");

  const addTodo = async (id: string) => {
    const params = {
      parent_id: id,
      user_id: session?.user?.id,
      content: todoContent,
    };

    try {
      const res = await axios.post(`/milestones/${id}/todos`, params);
      // 親側で更新
      addTodosToState(id, res.data);
      setTodoContent("");
    } catch (error) {
      console.error(error);
    }
  };

  return milestones && milestones.length > 0 ? (
    <ul>
      {milestones.map((milestone, index) => {
        const milestoneTodos = todos[milestone.id] || [];
        return (
          <li key={index}>
            <button onClick={() => onDelete(milestone.id)}>delete</button>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{milestone.content}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <p>id（デバッグ用）: {milestone.id}</p>
                  <p>goal_id（デバッグ用）: {milestone.goal_id}</p>
                  <TodoForm
                    setContent={setTodoContent}
                    // milestone.idは親側でだけ必要。なので必要なところ（=ここ）でidを代入している
                    addTodo={() => addTodo(milestone.id)}
                    content={todoContent}
                  />
                  {/* todo:コンポーネントに分割 */}
                  {/* todo:型書く */}
                  {/* todo:null時のテキスト追加 */}
                  {milestoneTodos.map((todo, ti) => {
                    return <div>{todo.content}</div>;
                  })}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </li>
        );
      })}
    </ul>
  ) : (
    <p>中目標はありません</p>
  );
};

export default MilestoneList;
