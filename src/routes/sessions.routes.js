import { Router } from "express";
import passport from "passport";
import { login, current } from "../controllers/sessions.controller.js";

const router = Router();

router.post(
  "/login",
  passport.authenticate("login", { session: false }),
  login
);
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  current
);

export default router;
