// type interfaceの違いを調べたい
export type User = {
  id: string;
  name: string;
};

export type Goal = {
  id: string;
  title: string;
  text: string;
  user_id: string;
  image_url: string;
  CreatedAt: Date;
  UpdatedAt: Date;
  smart_specific: string;
  smart_measurable: string;
  smart_achievable: string;
  smart_relevant: string;
  smart_time_bound: string;
};

export type GoalComment = {
  id: string;
  goal_id: string;
  title: string;
  text: string;
};
