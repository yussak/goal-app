import Axios from "axios";

// todo:環境変数で書き換え必要そう
export const axios = Axios.create({
  baseURL: "http://localhost:5000",
});
