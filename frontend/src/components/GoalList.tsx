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
            </p>
          </li>
        );
      })}
    </ul>
  ) : (
    <p>目標はありません</p>
  );
};

export default GoalList;
