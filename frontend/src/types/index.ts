// TODO:d.tsを使うべきか調べる

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
  content: string;
  purpose: string;
  loss: string;
  progress: number;
};

// フォーム用に用意した方がいい
export type GoalFormData = {
  content: string;
  purpose: string;
  loss: string;
};

export type GoalComment = {
  id: string;
  goal_id: string;
  title: string;
  text: string;
};
