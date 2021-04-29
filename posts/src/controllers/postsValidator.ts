const { body } = require("express-validator");

exports.validatePost = [
  body("message").notEmpty().withMessage("Post must contain some words"),
];
