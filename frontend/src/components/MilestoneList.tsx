import { Milestone } from "@/types";
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
  onDelete: (id: string) => void;
};

const MilestoneList = ({ milestones, onDelete }: MilestoneListProps) => {
  const { data: session } = useSession();

  const [todoContent, setTodoContent] = useState<string>("");

  const addTodo = async (id: string) => {
    const params = {
      parent_id: id,
      content: todoContent,
      user_id: session?.user?.id,
    };
    try {
      const res = await axios.post(`/goals/${id}/Todos`, params);
      // await getTodos();
      setTodoContent("");
    } catch (error) {
      console.error(error);
    }
  };
  return milestones && milestones.length > 0 ? (
    <ul>
      {milestones.map((milestone, index) => {
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
