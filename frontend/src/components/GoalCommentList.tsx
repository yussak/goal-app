const GoalCommentList = ({ comments, onDelete }) => {
  console.log(comments);
  return comments && comments.length > 0 ? (
    <ul>
      {comments.map((comment, index) => {
        return (
          <li key={index}>
            <p>
              title: {comment.title}
              text: {comment.text}
            </p>
            <p>id: {comment.id}</p>
            <p>goal_id: {comment.goal_id}</p>
          </li>
        );
      })}
    </ul>
  ) : (
    <p>コメントはありません</p>
  );
};

export default GoalCommentList;
