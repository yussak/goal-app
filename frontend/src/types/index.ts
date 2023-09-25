// type interfaceの違いを調べたい
export type User = {
  id: string;
  name: string;
};

// file追加した方がよさそう
// 分をキャメルに変えた方がよさそう
export type Goal = {
  id: string;
  user_id: string;
  image_url: string;
  CreatedAt: Date;
  UpdatedAt: Date;
  specific: string;
  measurable: string;
  achievable: string;
  relevant: string;
  time_bound: string;
  purpose: string;
  loss: string;
  progress: number;
};

// フォーム用に用意した方がいい
export type GoalFormData = {
  specific: string;
  measurable: string;
  achievable: string;
  relevant: string;
  timeBound: string;
  purpose: string;
  loss: string;
  file: File | null;
  imageURL: string | null;
};

export type GoalComment = {
  id: string;
  goal_id: string;
  title: string;
  text: string;
};
