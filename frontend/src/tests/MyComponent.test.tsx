import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
// TODO:エイリアス設定
import { MyComponent } from "../components/MyComponent";
// TODO:import reactしなくていい方法探す
import React from "react";

test("「Hello Test」が描画されている", () => {
  render(<MyComponent />);
  // TODO:Property 'toBeInTheDocument' does not exist on type 'Assertion'.エラーを消す
  expect(screen.getByText("Hello Test")).toBeInTheDocument();
});
