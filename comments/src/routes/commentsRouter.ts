import express from "express";
import { requireAuth, validateRequest } from "@lmportal/common";
const commentsController = require("../controllers/commentsController");
const validator = require("../controllers/commentsValidation");
const router = express.Router();

router
  .route("/posts/:id/comments")
  .post(
    requireAuth,
    validator.validateComments,
    validateRequest,
    commentsController.createComment
  )
  .get(requireAuth, commentsController.getCommentsByPosts);

router.route("/").get(requireAuth, commentsController.getAllComments);

module.exports = router;
