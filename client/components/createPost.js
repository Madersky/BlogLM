import React, { useState } from "react";
import Router from "next/router";

import useRequest from "../hooks/use-request";

const CreatePost = ({ currentUser, context, groupId }) => {
  const [message, setMessage] = useState("");

  const { doRequest, errors } = useRequest({
    url: "https://blog.dev/api/posts",
    method: "post",
    body: {
      message,
      groupId,
    },
    onSuccess: () => {
      Router.reload();
      console.log("Post created");
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    doRequest();
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <div className="form-post">
          <div className="user-avatar"> </div>
          <div className="user-name">
            <h5>{currentUser.email}</h5>
          </div>

          <textarea
            id="textarea"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            name="textarea"
            placeholder="What are you thinking about?"
            rows="1"
            cols="40"
          ></textarea>
          <div className="post-errors">{errors}</div>
          <button className="btn-addpost">Add post</button>
        </div>
      </div>
    </form>
  );
};

export default CreatePost;
