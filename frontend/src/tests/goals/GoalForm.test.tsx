import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import GoalForm from "@/components/form/GoalForm";

it("should render the basic fields", () => {
  const goalData = {
    purpose: "",
    loss: "",
    smartS: "",
    smartM: "",
    smartA: "",
    smartR: "",
    smartT: "",
  };

  render(<GoalForm goalData={goalData} />);
  expect(
    screen.getByText("達成したいことを書きましょう（必須）")
  ).toBeInTheDocument();
});
