import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent, { UserEvent } from "@testing-library/user-event";
import MilestoneForm from "@/components/form/MilestoneForm";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

describe("Create milestone", () => {
  const addMilestoneMock = vi.fn();
  let user: UserEvent;

  beforeEach(() => {
    render(<MilestoneForm addMilestone={addMilestoneMock} />);
    user = userEvent.setup();
  });

  afterEach(() => {
    addMilestoneMock.mockReset();
  });

  it("should submit when correct value is input", async () => {
    await user.type(screen.getByRole("textbox", { name: "content" }), "中目標");

    // // 送信ボタンをクリック
    // await user.click(screen.getByRole("button", { name: "追加" }));
    // todo:テスト環境でi18nの初期化ができてないのか"追加"だと通らないので通るようにする
    await user.click(
      screen.getByRole("button", {
        name: "milestone_form.button1",
      })
    );

    // addMilestoneがユーザーが入力したデータで呼び出されたことを確認
    expect(addMilestoneMock).toBeCalledWith({
      content: "中目標",
    });
  });

  it("should validate when too short value is input", async () => {
    await user.type(screen.getByRole("textbox", { name: "content" }), "ああ");

    expect(screen.getByTestId(`error-content`)).toHaveTextContent(
      "3文字以上で入力してください"
    );
  });

  it("should validate when too long value is input", async () => {
    await user.type(
      screen.getByRole("textbox", { name: "content" }),
      "サンプルテキストサンプルテキスト"
    );

    expect(screen.getByTestId(`error-content`)).toHaveTextContent(
      "10文字以内で入力してください"
    );
  });

  it("should submit when invalid value is fixed", async () => {
    // バリデーションエラーになる値を入力
    await user.type(
      screen.getByRole("textbox", { name: "content" }),
      "サンプルテキストサンプルテキスト"
    );

    expect(screen.getByRole("button", { name: "追加" })).toBeDisabled();

    // リセットして正しい値を入力し直す
    await user.clear(screen.getByRole("textbox", { name: "content" }));

    await user.type(screen.getByRole("textbox", { name: "content" }), "テスト");

    expect(screen.getByRole("button", { name: "追加" })).not.toBeDisabled();
    await user.click(screen.getByRole("button", { name: "追加" }));

    expect(addMilestoneMock).toBeCalledWith({
      content: "テスト",
    });
  });
});
