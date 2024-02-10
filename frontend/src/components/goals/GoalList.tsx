import { useGoals } from "@/contexts/goalContext";
import GoalContent from "./GoalContent";
import { useTranslation } from "next-i18next";

const GoalList = (): JSX.Element => {
  const { goals } = useGoals();
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
