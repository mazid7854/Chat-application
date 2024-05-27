import express from "express";
const router = express.Router();

import {
  loginUser_post,
  signupUser_post,
  logoutUser_post,
} from "../controllers/auth.controller.js";

/* routes */
router.post("/signup", signupUser_post);
router.post("/login", loginUser_post);
router.post("/logout", logoutUser_post);

export default router;
