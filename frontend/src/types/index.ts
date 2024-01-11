// TODO:d.tsを使うべきか調べる
// todo: キャメルなどそろえる

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

export type TodoFormData = {
  content: string;
};

export type Milestone = {
  id: string;
  user_id: string;
  goal_id: string;
  CreatedAt: Date;
  UpdatedAt: Date;
  content: string;
};

export type Todo = {
  id: string;
  parent_id: string;
  user_id: string;
  content: string;
  is_completed: boolean;
  CreatedAt: Date;
  UpdatedAt: Date;
};
