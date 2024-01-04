import axios from "axios";
import cookie from "cookie";
import { NextPageContext } from "next";

export async function checkAuth(context: NextPageContext) {
  const cookies = cookie.parse(
    context.req ? context.req.headers.cookie || "" : document.cookie
  );
  const token = cookies.token;

  // console.log("token is", token);

  // Tokenが存在しない場合はユーザー情報を空にする
  if (!token) {
    return null;
  }

  try {
    // todo:環境変数で書き換え必要そう
    const res = await axios.post(
      "http://backend:5000/auth/decodeToken",
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data.user || null;
  } catch (error) {
    console.error("error: ", error);
    return null;
  }
}
