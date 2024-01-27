import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent, { UserEvent } from "@testing-library/user-event";
import MilestoneForm from "@/components/form/MilestoneForm";

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

    // 送信ボタンをクリック
    await user.click(screen.getByRole("button", { name: "追加" }));

    // addMilestoneがユーザーが入力したデータで呼び出されたことを確認
    expect(addMilestoneMock).toBeCalledWith({
      content: "中目標",
    });
  });

  it("should not submit when invalid values are input", async () => {
    await user.type(screen.getByRole("textbox", { name: "content" }), "ああ");

    expect(screen.getByRole("button", { name: "追加" })).toBeDisabled();
    expect(addMilestoneMock).not.toBeCalled();
  });

  //   it("should validate when too short values are input", async () => {
  //     await user.type(screen.getByRole("textbox", { name: "purpose" }), "ああ");
  //     await user.type(screen.getByRole("textbox", { name: "content" }), "ああ");
  //     await user.type(screen.getByRole("textbox", { name: "loss" }), "ああ");

  //     expect(screen.getByTestId(`error-purpose`)).toHaveTextContent(
  //       "3文字以上で入力してください"
  //     );
  //     expect(screen.getByTestId(`error-content`)).toHaveTextContent(
  //       "3文字以上で入力してください"
  //     );
  //     expect(screen.getByTestId(`error-loss`)).toHaveTextContent(
  //       "3文字以上で入力してください"
  //     );
  //   });

  //   it("should validate when too long values are input", async () => {
  //     await user.type(
  //       screen.getByRole("textbox", { name: "purpose" }),
  //       "サンプルテキストサンプルテキスト"
  //     );
  //     await user.type(
  //       screen.getByRole("textbox", { name: "loss" }),
  //       "サンプルテキストサンプルテキスト"
  //     );
  //     await user.type(
  //       screen.getByRole("textbox", { name: "content" }),
  //       "サンプルテキストサンプルテキスト"
  //     );
  //     // await user.click(screen.getByRole("button", { name: "追加" }));

  //     // expect(screen.getByRole("button", { name: "追加" })).not.toBeDisabled();

  //     expect(screen.getByTestId(`error-purpose`)).toHaveTextContent(
  //       "10文字以内で入力してください"
  //     );
  //     expect(screen.getByTestId(`error-content`)).toHaveTextContent(
  //       "10文字以内で入力してください"
  //     );
  //     expect(screen.getByTestId(`error-loss`)).toHaveTextContent(
  //       "10文字以内で入力してください"
  //     );
  //   });

  //   it("should submit when invalid values are fixed", async () => {
  //     // バリデーションエラーになる値を入力
  //     // contentは空
  //     await user.type(screen.getByRole("textbox", { name: "purpose" }), "目的");
  //     await user.type(
  //       screen.getByRole("textbox", { name: "loss" }),
  //       "ロスですロスですロスです"
  //     );

  //     expect(screen.getByRole("button", { name: "追加" })).toBeDisabled();

  //     // リセットして正しい値を入力し直す
  //     await user.clear(screen.getByRole("textbox", { name: "purpose" }));
  //     await user.clear(screen.getByRole("textbox", { name: "content" }));
  //     await user.clear(screen.getByRole("textbox", { name: "loss" }));

  //     await user.type(screen.getByRole("textbox", { name: "purpose" }), "テスト");
  //     await user.type(screen.getByRole("textbox", { name: "content" }), "テスト");
  //     await user.type(screen.getByRole("textbox", { name: "loss" }), "テスト");

  //     expect(screen.getByRole("button", { name: "追加" })).not.toBeDisabled();
  //     await user.click(screen.getByRole("button", { name: "追加" }));

  //     expect(addMilestoneMock).toBeCalledWith({
  //       purpose: "テスト",
  //       content: "テスト",
  //       loss: "テスト",
  //     });
  //   });
});
