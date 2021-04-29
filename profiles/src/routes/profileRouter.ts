import express from "express";
import {
  requireAuth,
  validateRequest,
  BadRequestError,
} from "@lmportal/common";

const validator = require("../controllers/profileValidator");
const profileController = require("../controllers/profileController");
const router = express.Router();

router
  .route("/")
  .get(requireAuth, profileController.getAllProfiles)
  .post(
    requireAuth,
    validator.validateProfile,
    validateRequest,
    profileController.createProfile
  );

router
  .route("/id/:id")
  .get(requireAuth, profileController.getProfileByUserId)
  .patch(
    requireAuth,
    validator.validateProfile,
    validateRequest,
    profileController.patchProfile
  );

router
  .route("/email/:email")
  .get(requireAuth, profileController.getProfileByEmail);

module.exports = router;
