const GoalList = ({ goals }) => {
  return goals ? (
    <ul>
      {goals.map((goal, index) => {
        return (
          <li key={index}>
            <p>
              title: {goal.title}
              text: {goal.text}
            </p>
          </li>
        );
      })}
    </ul>
  ) : (
    <p>null</p>
  );
};

export default GoalList;
