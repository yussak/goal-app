export const validationRules = {
  required: "必須です",
  minLength: { value: 3, message: "3文字以上で入力してください" },
  maxLength: { value: 10, message: "10文字以内で入力してください" },
};

export const requireValidationRules = {
  required: "必須です",
  minLength: { value: 3, message: "3文字以上で入力してください" },
  maxLength: { value: 80, message: "80文字以内で入力してください" },
};

export const optionalValidationRules = {
  minLength: { value: 3, message: "3文字以上で入力してください" },
  maxLength: { value: 80, message: "80文字以内で入力してください" },
};
