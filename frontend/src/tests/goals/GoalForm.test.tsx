import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import GoalForm from "@/components/form/GoalForm";
import userEvent from "@testing-library/user-event";

describe("GoalForm component", () => {
  const SetGoalDataMock = vi.fn();
  const addGoalMock = vi.fn();

  const goalData = {
    purpose: "",
    loss: "",
    content: "",
  };

  it("should submit when correct values are input", async () => {
    render(
      <GoalForm
        SetGoalData={SetGoalDataMock}
        goalData={{}}
        addGoal={addGoalMock}
      />
    );
    const user = userEvent.setup();

    // 各フィールドに入力
    await user.type(
      screen.getByRole("textbox", { name: "purpose" }),
      "目的です"
    );
    await user.type(screen.getByRole("textbox", { name: "loss" }), "ロスです");
    await user.type(
      screen.getByRole("textbox", { name: "content" }),
      "内容です"
    );

    // 送信ボタンをクリック
    await user.click(screen.getByRole("button", { name: "追加" }));

    // addGoalがユーザーが入力したデータで呼び出されたことを確認
    expect(addGoalMock).toBeCalledWith({
      purpose: "目的です",
      loss: "ロスです",
      content: "内容です",
    });
  });

  // it("正しくないデータを受け取てエラーを出せる", async () => {
  //   render(
  //     <GoalForm
  //       SetGoalData={handleSetGoalDataMock}
  //       goalData={{}}
  //       addGoal={addGoalMock}
  //     />
  //   );
  //   const user = userEvent.setup();

  //   await user.type(
  //     screen.getByRole("textbox", { name: "purpose" }),
  //     "aaaaaaaaaaa"
  //   );
  //   await user.type(screen.getByRole("textbox", { name: "smartS" }), "a");

  //   // 送信ボタンをクリック
  //   await user.click(screen.getByRole("button", { name: "追加" }));

  //   // フォームにdata-testidをつけて指定
  //   expect(screen.getByTestId(`error-purpose`)).toHaveTextContent(
  //     "10文字以内で入力してください"
  //   );
  //   expect(screen.getByTestId(`error-smartS`)).toHaveTextContent(
  //     "3文字以上で入力してください"
  //   );
  // });
});
