import React from 'react';

const Post = ({ data }) => {
  return (
    <div className="list-post">
      <div className="user-avatar"> avatar mańka </div>
      <div className="user-data"> ktoś </div>
      <div className="post">typical post in lets meet</div>
      {/* <div className="comments">
        <textarea
          id="comment-text"
          // value={message}
          // onChange={(e) => setMessage(e.target.value)}
          name="comment-text"
          placeholder="What are you thinking about this post?"
          rows="3"
          cols="30"
        ></textarea>
      </div> */}
      <div className="comments"></div>
    </div>
  );
};

export default Post;
