import { Milestone } from "@/types";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type MilestoneListProps = {
  milestones: Milestone[];
  onDelete: (id: string) => void;
};

const MilestoneList = ({ milestones, onDelete }: MilestoneListProps) => {
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
