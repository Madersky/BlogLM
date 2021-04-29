import express from "express";
import { requireAuth, validateRequest } from "@lmportal/common";
const postController = require("../controllers/postsController");
const router = express.Router();
const validator = require("../controllers/postsValidator");

// router
//   .route('/exact-post')
//   .get(postController.aliasExactPost)
//   .patch(
//     postController.aliasExactPost,
//     postController.updatePost
//   );

router
  .route("/id/:id")
  .get(requireAuth, postController.getPostsByUserId)
  .patch(
    requireAuth,
    validator.validatePost,
    validateRequest,
    postController.updatePost
  )
  .delete(requireAuth, postController.deletePost);

router
  .route("/group-posts/:id")
  .get(requireAuth, postController.getPostsByGroupId);

router
  .route("/")
  .get(requireAuth, postController.getAllPostsWithNoGroup)
  .post(
    requireAuth,
    validator.validatePost,
    validateRequest,
    postController.createPost
  );

module.exports = router;
