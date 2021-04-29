const { body } = require("express-validator");

exports.validateComments = [
  body("message").notEmpty().withMessage("Comment have to contain words"),
];
