import { useTranslation } from "next-i18next";
import { useMilestone } from "@/contexts/mileContext";
import { useTodos } from "@/contexts/todoContext";
import MilestoneContent from "./MilestoneContent";
import { useMilestones } from "@/hooks/milestone";

const MilestoneList = () => {
  const { t } = useTranslation();
  const { isMilestoneCompleted } = useMilestone();
  const { milestones } = useMilestones();
  const { todos } = useTodos();

  return milestones && milestones.length > 0 ? (
    <ul>
      {milestones.map((milestone, index) => {
        const milestoneTodos = todos[milestone.id] || [];
        const isAllCompleted = isMilestoneCompleted(milestoneTodos);
        return (
          <li key={index}>
            <MilestoneContent
              milestone={milestone}
              milestoneTodos={milestoneTodos}
              isAllCompleted={isAllCompleted}
            />
          </li>
        );
      })}
    </ul>
  ) : (
    <span>{t("milestone_list.text2")}</span>
  );
};

export default MilestoneList;
