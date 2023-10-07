// type interfaceの違いを調べたい
export type User = {
  id: string;
  name: string;
};

// smart分をキャメルに変えた方がよさそう
export type Goal = {
  id: string;
  user_id: string;
  CreatedAt: Date;
  UpdatedAt: Date;
  smartS: string;
  smartM: string;
  smartA: string;
  smartR: string;
  smartT: string;
  purpose: string;
  loss: string;
  progress: number;
};

// フォーム用に用意した方がいい
export type GoalFormData = {
  smartS: string;
  smartM: string;
  smartA: string;
  smartR: string;
  smartT: string;
  purpose: string;
  loss: string;
};

export type GoalComment = {
  id: string;
  goal_id: string;
  title: string;
  text: string;
};

// map用に用意。配列の中身とそれぞれの型を指定
export type SmartFieldKeys = keyof {
  smartS: string;
  smartM: string;
  smartA: string;
  smartR: string;
  smartT: string;
};

export const smartFields: SmartFieldKeys[] = [
  "smartS",
  "smartM",
  "smartA",
  "smartR",
  "smartT",
];
