const { body, oneOf } = require("express-validator");

exports.validateProfile = [
  body("firstName").trim().notEmpty().withMessage("Write your name please"),
  body("lastName").trim().notEmpty().withMessage("Write your lastname please"),
  body("message").trim(),
  body("age")
    .optional({ checkFalsy: true })
    .isInt()
    .withMessage("The age have to be a number"),
  oneOf(
    [
      body("socialStatus").optional({ checkFalsy: true }).equals("Single"),
      body("socialStatus")
        .optional({ checkFalsy: true })
        .equals("in Relationship"),
      body("socialStatus").optional({ checkFalsy: true }).equals("Engaged"),
      body("socialStatus").optional({ checkFalsy: true }).equals("Widow"),
      body("socialStatus").optional({ checkFalsy: true }).equals("Widower"),
      body("socialStatus").optional({ checkFalsy: true }).equals("Married"),
    ],
    "Social status have to be social status"
  ),
  body("phoneNumber").optional({ checkFalsy: true }).isInt(),
];
