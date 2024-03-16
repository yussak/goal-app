import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import GoalForm from "@/components/form/GoalForm";
import userEvent, { UserEvent } from "@testing-library/user-event";

describe("Create goal", () => {
  const addGoalMock = vi.fn();
  let user: UserEvent;

  beforeEach(() => {
    render(<GoalForm addGoal={addGoalMock} />);
    user = userEvent.setup();
  });

  afterEach(() => {
    addGoalMock.mockReset();
  });

  it("should submit when correct values are input", async () => {
    // 各フィールドに入力
    await user.type(
      screen.getByRole("textbox", { name: "purpose" }),
      "目的です"
    );
    await user.type(
      screen.getByRole("textbox", { name: "benefit" }),
      "ロスです"
    );
    await user.type(
      screen.getByRole("textbox", { name: "content" }),
      "内容です"
    );
    // 送信ボタンをクリック
    await user.click(screen.getByRole("button", { name: "追加" }));

    // addGoalがユーザーが入力したデータで呼び出されたことを確認
    expect(addGoalMock).toBeCalledWith({
      purpose: "目的です",
      benefit: "ロスです",
      content: "内容です",
    });
  });

  it("should not submit when invalid values are input", async () => {
    // contentは空
    await user.type(screen.getByRole("textbox", { name: "purpose" }), "目的");
    await user.type(
      screen.getByRole("textbox", { name: "benefit" }),
      "ロスですロスですロスです"
    );

    expect(screen.getByRole("button", { name: "追加" })).toBeDisabled();
    expect(addGoalMock).not.toBeCalled();
  });

  it("should validate when too short values are input", async () => {
    await user.type(screen.getByRole("textbox", { name: "purpose" }), "ああ");
    await user.type(screen.getByRole("textbox", { name: "content" }), "ああ");
    await user.type(screen.getByRole("textbox", { name: "benefit" }), "ああ");

    expect(screen.getByTestId(`error-purpose`)).toHaveTextContent(
      "3文字以上で入力してください"
    );
    expect(screen.getByTestId(`error-content`)).toHaveTextContent(
      "3文字以上で入力してください"
    );
    expect(screen.getByTestId(`error-benefit`)).toHaveTextContent(
      "3文字以上で入力してください"
    );
  });

  it("should validate when too long values are input", async () => {
    await user.type(
      screen.getByRole("textbox", { name: "purpose" }),
      "サンプルテキストサンプルテキスト"
    );
    await user.type(
      screen.getByRole("textbox", { name: "benefit" }),
      "サンプルテキストサンプルテキスト"
    );
    await user.type(
      screen.getByRole("textbox", { name: "content" }),
      "サンプルテキストサンプルテキスト"
    );
    // await user.click(screen.getByRole("button", { name: "追加" }));

    // expect(screen.getByRole("button", { name: "追加" })).not.toBeDisabled();

    expect(screen.getByTestId(`error-purpose`)).toHaveTextContent(
      "10文字以内で入力してください"
    );
    expect(screen.getByTestId(`error-content`)).toHaveTextContent(
      "10文字以内で入力してください"
    );
    expect(screen.getByTestId(`error-benefit`)).toHaveTextContent(
      "10文字以内で入力してください"
    );
  });

  it("should submit when invalid values are fixed", async () => {
    // バリデーションエラーになる値を入力
    // contentは空
    await user.type(screen.getByRole("textbox", { name: "purpose" }), "目的");
    await user.type(
      screen.getByRole("textbox", { name: "benefit" }),
      "ロスですロスですロスです"
    );

    expect(screen.getByRole("button", { name: "追加" })).toBeDisabled();

    // リセットして正しい値を入力し直す
    await user.clear(screen.getByRole("textbox", { name: "purpose" }));
    await user.clear(screen.getByRole("textbox", { name: "content" }));
    await user.clear(screen.getByRole("textbox", { name: "benefit" }));

    await user.type(screen.getByRole("textbox", { name: "purpose" }), "テスト");
    await user.type(screen.getByRole("textbox", { name: "content" }), "テスト");
    await user.type(screen.getByRole("textbox", { name: "benefit" }), "テスト");

    expect(screen.getByRole("button", { name: "追加" })).not.toBeDisabled();
    await user.click(screen.getByRole("button", { name: "追加" }));

    expect(addGoalMock).toBeCalledWith({
      purpose: "テスト",
      content: "テスト",
      benefit: "テスト",
    });
  });
});
