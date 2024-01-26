import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import GoalForm from "@/components/form/GoalForm";
import userEvent from "@testing-library/user-event";

describe("Create goal", () => {
  const addGoalMock = vi.fn();

  afterEach(() => {
    addGoalMock.mockReset();
  });

  it("should submit when correct values are input", async () => {
    render(<GoalForm addGoal={addGoalMock} />);
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
    render(<GoalForm addGoal={addGoalMock} />);
    const user = userEvent.setup();

    // contentは空
    await user.type(screen.getByRole("textbox", { name: "purpose" }), "目的");
    await user.type(
      screen.getByRole("textbox", { name: "loss" }),
      "ロスですロスですロスです"
    );

    expect(screen.getByRole("button", { name: "追加" })).toBeDisabled();
    expect(addGoalMock).not.toBeCalled();
  });

  it("should validate when too short values are input", async () => {
    render(<GoalForm addGoal={addGoalMock} />);
    const user = userEvent.setup();

    await user.type(screen.getByRole("textbox", { name: "purpose" }), "目的");
    await user.type(screen.getByRole("textbox", { name: "loss" }), "ロス");
    await user.type(screen.getByRole("textbox", { name: "content" }), "内容");
    await user.click(screen.getByRole("button", { name: "追加" }));

    // ボタンクリックはできる
    expect(screen.getByRole("button", { name: "追加" })).not.toBeDisabled();
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
    render(<GoalForm addGoal={addGoalMock} />);
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

    expect(screen.getByRole("button", { name: "追加" })).not.toBeDisabled();

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

  it("should submit when invalid values are fixed", async () => {
    render(<GoalForm addGoal={addGoalMock} />);
    const user = userEvent.setup();

    // バリデーションエラーになる値を入力
    // contentは空
    await user.type(screen.getByRole("textbox", { name: "purpose" }), "目的");
    await user.type(
      screen.getByRole("textbox", { name: "loss" }),
      "ロスですロスですロスです"
    );

    expect(screen.getByRole("button", { name: "追加" })).toBeDisabled();

    // リセットして正しい値を入力し直す
    await user.clear(screen.getByRole("textbox", { name: "purpose" }));
    await user.clear(screen.getByRole("textbox", { name: "content" }));
    await user.clear(screen.getByRole("textbox", { name: "loss" }));

    await user.type(screen.getByRole("textbox", { name: "purpose" }), "テスト");
    await user.type(screen.getByRole("textbox", { name: "content" }), "テスト");
    await user.type(screen.getByRole("textbox", { name: "loss" }), "テスト");

    expect(screen.getByRole("button", { name: "追加" })).not.toBeDisabled();
    await user.click(screen.getByRole("button", { name: "追加" }));

    expect(addGoalMock).toBeCalledWith({
      purpose: "テスト",
      content: "テスト",
      loss: "テスト",
    });
  });
});
