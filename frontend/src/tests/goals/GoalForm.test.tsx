import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import GoalForm from "@/components/form/GoalForm";

const handleSetGoalDataMock = vi.fn();
const addGoalMock = vi.fn();

const goalData = {
  purpose: "",
  loss: "",
  smartS: "",
  smartM: "",
  smartA: "",
  smartR: "",
  smartT: "",
};

it("フォームのテキストが表示できている", () => {
  render(
    <GoalForm
      SetGoalData={handleSetGoalDataMock}
      goalData={goalData}
      addGoal={addGoalMock}
    />
  );
  expect(
    screen.getByText("達成したいことを書きましょう（必須）")
  ).toBeInTheDocument();
});
