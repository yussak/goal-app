import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import GoalForm from "@/components/form/GoalForm";
import userEvent from "@testing-library/user-event";
import { GoalFormData } from "@/types";

describe("GoalForm component", () => {
  const SetGoalDataMock = vi.fn();
  const addGoalMock = vi.fn();

  afterEach(() => {
    SetGoalDataMock.mockReset();
    addGoalMock.mockReset();
  });

  it("should submit when correct values are input", async () => {
    expect.assertions(1);
    render(
      <GoalForm
        SetGoalData={SetGoalDataMock}
        // purpose:"",content:"",...と渡したら型エラーが出たため型を指定
        goalData={{} as GoalFormData}
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

  it("should not submit when invalid values are input", async () => {
    expect.assertions(1);
    render(
      <GoalForm
        SetGoalData={SetGoalDataMock}
        goalData={{} as GoalFormData}
        addGoal={addGoalMock}
      />
    );
    const user = userEvent.setup();

    await user.type(screen.getByRole("textbox", { name: "purpose" }), "目的");
    await user.type(
      screen.getByRole("textbox", { name: "loss" }),
      "ロスですロスですロスです"
    );

    await user.click(screen.getByRole("button", { name: "追加" }));
    expect(addGoalMock).not.toBeCalled();
  });

  it("should validate when values are not input", async () => {
    expect.assertions(3);
    render(
      <GoalForm
        SetGoalData={SetGoalDataMock}
        goalData={{} as GoalFormData}
        addGoal={addGoalMock}
      />
    );
    const user = userEvent.setup();

    // 値を入力せず送信ボタンをクリック
    await user.click(screen.getByRole("button", { name: "追加" }));

    expect(screen.getByTestId(`error-purpose`)).toHaveTextContent("必須です");
    expect(screen.getByTestId(`error-content`)).toHaveTextContent("必須です");
    expect(screen.getByTestId(`error-loss`)).toHaveTextContent("必須です");
  });

  it("should validate when too short values are input", async () => {
    expect.assertions(3);
    render(
      <GoalForm
        SetGoalData={SetGoalDataMock}
        goalData={{} as GoalFormData}
        addGoal={addGoalMock}
      />
    );
    const user = userEvent.setup();

    await user.type(screen.getByRole("textbox", { name: "purpose" }), "目的");
    await user.type(screen.getByRole("textbox", { name: "loss" }), "ロス");
    await user.type(screen.getByRole("textbox", { name: "content" }), "内容");

    await user.click(screen.getByRole("button", { name: "追加" }));

    expect(screen.getByTestId(`error-purpose`)).toHaveTextContent(
      "3文字以上で入力してください"
    );
    expect(screen.getByTestId(`error-content`)).toHaveTextContent(
      "3文字以上で入力してください"
    );
    expect(screen.getByTestId(`error-loss`)).toHaveTextContent(
      "3文字以上で入力してください"
    );
  });

  it("should validate when too long values are input", async () => {
    expect.assertions(3);
    render(
      <GoalForm
        SetGoalData={SetGoalDataMock}
        goalData={{} as GoalFormData}
        addGoal={addGoalMock}
      />
    );
    const user = userEvent.setup();

    await user.type(
      screen.getByRole("textbox", { name: "purpose" }),
      "サンプルテキストサンプルテキスト"
    );
    await user.type(
      screen.getByRole("textbox", { name: "loss" }),
      "サンプルテキストサンプルテキスト"
    );
    await user.type(
      screen.getByRole("textbox", { name: "content" }),
      "サンプルテキストサンプルテキスト"
    );

    await user.click(screen.getByRole("button", { name: "追加" }));

    expect(screen.getByTestId(`error-purpose`)).toHaveTextContent(
      "10文字以内で入力してください"
    );
    expect(screen.getByTestId(`error-content`)).toHaveTextContent(
      "10文字以内で入力してください"
    );
    expect(screen.getByTestId(`error-loss`)).toHaveTextContent(
      "10文字以内で入力してください"
    );
  });
});
