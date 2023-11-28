export const validationRules = {
  // TODO:制限をDBに合わせる
  required: "必須です",
  minLength: { value: 3, message: "3文字以上で入力してください" },
  maxLength: { value: 10, message: "10文字以内で入力してください" },
};
