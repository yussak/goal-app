// キャメルケースにそろえる

export type User = {
  id: string;
  name: string;
};

export type Goal = {
  id: string;
  userId: string;
  CreatedAt: Date;
  UpdatedAt: Date;
  content: string;
  purpose: string;
  benefit: string;
  progress: number;
  phase: string;
};

// フォーム用に用意した方がいい
export type GoalFormData = {
  userId: string;
  content: string;
  purpose: string;
  benefit: string;
  phase: string;
};

export type MilestoneFormData = {
  content: string;
};

export type TodoFormData = {
  content: string;
};

export type Milestone = {
  id: string;
  userId: string;
  goalId: string;
  CreatedAt: Date;
  UpdatedAt: Date;
  content: string;
};

export type Todo = {
  id: string;
  parentId: string;
  userId: string;
  content: string;
  isCompleted: boolean;
  CreatedAt: Date;
  UpdatedAt: Date;
};
