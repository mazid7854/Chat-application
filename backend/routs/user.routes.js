import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUserForSidebar_get } from "../controllers/user.controller.js";
const router = express.Router();

router.get("/", protectRoute, getUserForSidebar_get);

export default router;
