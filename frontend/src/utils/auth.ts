import axios from "axios";
import cookie from "cookie";
import { NextPageContext } from "next";

export async function checkAuth(context: NextPageContext) {
  const cookies = cookie.parse(
    context.req ? context.req.headers.cookie || "" : document.cookie
  );
  const token = cookies.token;

  // Tokenが存在しない場合はユーザー情報を空にする
  if (!token) {
    return null;
  }

  try {
    const res = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/auth/decodeToken",
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
