import express from "express";
const router = express.Router();

import {
  loginUser,
  signupUser,
  logoutUser,
} from "../controllers/auth.controller.js";

/* routes */
router.get("/signup", signupUser);
router.get("/login", loginUser);
router.get("/logout", logoutUser);

export default router;
