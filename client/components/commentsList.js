const CommentsList = ({ postId, comments }) => {
  return (
    <div className="comments-a">
      {comments.map((comment) => {
        if (postId == comment.postId)
          return (
            <div key={comment.id}>
              <div className="user-avatar-comment"></div>
              <h4 className="user-data-comment">{comment.email}</h4>
              <li>{comment.message}</li>
              <hr className="hr-style" />
            </div>
          );
      })}
    </div>
  );
};

export default CommentsList;
