import express from "express";
import upload from "../middleware/upload.js";
import protectRoute from "../middleware/protectRoute.js";
import {
  getUserForSidebar_get,
  searchUserByKeyword_get,
  getLastSeenUser_get,
  updateUser_put,
  uploadProfilePicture_post,
} from "../controllers/user.controller.js";
const router = express.Router();

router.get("/", protectRoute, getUserForSidebar_get);
router.get("/search", protectRoute, searchUserByKeyword_get);
router.get("/lastseen/:userId", getLastSeenUser_get);
router.put("/update/:id", protectRoute, updateUser_put);
router.post(
  "/profilePicture/:id",
  protectRoute,
  upload.single("profilePicture"), // Multer middleware for single file upload
  uploadProfilePicture_post
);

export default router;
