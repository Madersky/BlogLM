import React, { useState } from 'react';
import Router from 'next/router';

import useRequest from '../hooks/use-request';

const editPostClick = () => {
  let editPostContainer = document.getElementById(
    'edit-post-container'
  );
  let postContainer = document.getElementById(
    'post-content'
  );
  editPostContainer.style.display = 'inline-block';
  postContainer.style.display = 'none';
};

const cancelPostClick = () => {
  let editPostContainer = document.getElementById(
    'edit-post-container'
  );
  let postContainer = document.getElementById(
    'post-content'
  );
  editPostContainer.style.display = 'none';
  postContainer.style.display = 'block';
};

const editPost = ({ postId }) => {
  const [message, setMessage] = useState('');

  const { doRequest, errors } = useRequest({
    url: `/api/posts/id/${postId}`,
    method: 'patch',
    body: {
      message,
    },
    onSuccess: () => {
      Router.reload();
      console.log('post updated');
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    doRequest();
  };

  return (
    <div>
      {/* <button
        // onClick={editPostClick}
        className="bttn-edit-post"
      >
        Edit Post
      </button> */}
      <form onSubmit={onSubmit}>
        <div
          className="edit-post-container"
          id="edit-post-container"
        >
          <h4>Edit your post:</h4>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="edit-text-area"
            placeholder="Enter your new message."
            rows="7"
            cols="10"
          ></textarea>
          {/* <button className="bttn-delete-post">
            Delete post
          </button> */}
          <button className="bttn-accept-post">
            Accept
          </button>
          {/* <button
            onClick={cancelPostClick}
            className="bttn-cancel-post"
          >
            Cancel
          </button> */}
        </div>
      </form>
      {errors}
    </div>
  );
};

export default editPost;
