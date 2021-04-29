import React, { useState } from "react";
import Router from "next/router";

import useRequest from "../hooks/use-request";

const CreateComment = ({ postId }) => {
  const [message, setMessage] = useState("");

  const { doRequest, errors } = useRequest({
    url: `/api/comments/posts/${postId}/comments`,
    method: "post",
    body: {
      message,
    },
    onSuccess: () => {
      Router.reload();
      console.log("Comment created");
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    doRequest();
  };

  return (
    <div>
      <div className="comments-form">
        <label className="comments-label">Comment</label>
        <form onSubmit={onSubmit}>
          <input
            className="comments-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="btn-add-comment">Add</button>
        </form>
        {errors}
      </div>
    </div>
  );
};

export default CreateComment;
