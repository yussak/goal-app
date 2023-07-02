import Link from "next/link";

const GoalList = ({ goals, onDelete }) => {
  return goals ? (
    <ul>
      {goals.map((goal, index) => {
        return (
          <li key={index}>
            <p>
              title: {goal.title}
              text: {goal.text}
              <button onClick={() => onDelete(goal.id)}>delete</button>
              <Link href={`/goals/${goal.id}`}>detail</Link>
            </p>
            <p>id: {goal.id}</p>
          </li>
        );
      })}
    </ul>
  ) : (
    <p>目標はありません</p>
  );
};

export default GoalList;
