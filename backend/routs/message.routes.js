import express from "express";
const router = express.Router();
import {
  sendMessage_post,
  getMessage_get,
} from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

router.get("/:id", protectRoute, getMessage_get);
router.post("/send/:id", protectRoute, sendMessage_post);

export default router;
