import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import GoalForm from "@/components/form/GoalForm";
import userEvent from "@testing-library/user-event";

// TODO: import候補が出ないのを修正

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

it("フォームのテキストが表示できている", async () => {
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

it("データを入力して送信できる", async () => {
  render(
    <GoalForm
      SetGoalData={handleSetGoalDataMock}
      goalData={{}}
      addGoal={addGoalMock}
    />
  );
  const user = userEvent.setup();

  // 各フィールドに入力
  await user.type(screen.getByRole("textbox", { name: "purpose" }), "asdf");
  await user.type(screen.getByRole("textbox", { name: "loss" }), "asdf");
  await user.type(screen.getByRole("textbox", { name: "smartS" }), "asdf");
  await user.type(screen.getByRole("textbox", { name: "smartM" }), "asdf");
  await user.type(screen.getByRole("textbox", { name: "smartA" }), "asdf");
  await user.type(screen.getByRole("textbox", { name: "smartR" }), "asdf");
  await user.type(screen.getByRole("textbox", { name: "smartT" }), "asdf");

  // 送信ボタンをクリック
  await user.click(screen.getByRole("button", { name: "追加" }));

  // addGoalがユーザーが入力したデータで呼び出されたことを確認
  expect(addGoalMock).toBeCalledWith({
    // TODO:重複しているのでリファクタしたい
    purpose: "asdf",
    loss: "asdf",
    smartS: "asdf",
    smartM: "asdf",
    smartA: "asdf",
    smartR: "asdf",
    smartT: "asdf",
  });
});
