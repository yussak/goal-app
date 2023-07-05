// type interfaceの違いを調べたい
export type Goal = {
  id: string;
  title: string;
  text: string;
};

export type GoalComment = {
  id: string;
  goal_id: string;
  title: string;
  text: string;
};
