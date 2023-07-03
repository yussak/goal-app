// type interfaceの違いを調べたい
export type Goal = {
  title: string;
  text: string;
};

export type GoalComment = {
  goal_id: string;
  title: string;
  text: string;
};
