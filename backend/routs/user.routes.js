import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  getUserForSidebar_get,
  searchUserByKeyword_get,
} from "../controllers/user.controller.js";
const router = express.Router();

router.get("/", protectRoute, getUserForSidebar_get);
router.get("/search", protectRoute, searchUserByKeyword_get);

export default router;
