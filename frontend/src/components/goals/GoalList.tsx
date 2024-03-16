import GoalContent from "./GoalContent";
import { useTranslation } from "next-i18next";
import { Goal } from "@/types";

type props = {
  goals: Goal[] | null;
};

const GoalList = ({ goals }: props): JSX.Element => {
  const { t } = useTranslation();

  return goals && goals.length > 0 ? (
    <ul>
      {goals.map((goal, index) => {
        return (
          <li key={index} className="goal-list">
            <GoalContent goal={goal} />
          </li>
        );
      })}
    </ul>
  ) : (
    <p>{t("goal_index.not_found")}</p>
  );
};

export default GoalList;
