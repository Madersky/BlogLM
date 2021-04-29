import express from "express";
import { requireAuth, validateRequest } from "@lmportal/common";

const groupsController = require("../controllers/groupsControllers");

const router = express.Router();

router
  .route("/")
  .post(requireAuth, groupsController.createGroup)
  .get(requireAuth, groupsController.getAllGroups);

router
  .route("/:id")
  .patch(requireAuth, groupsController.updatingGroup)
  .get(requireAuth, groupsController.getGroupById);

router
  .route("/yourGroups/:userId")
  .get(requireAuth, groupsController.getGroupByUserId);

module.exports = router;
