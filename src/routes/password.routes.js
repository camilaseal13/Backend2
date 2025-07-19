import { Router } from "express";
import {
  sendResetPassword,
  resetPassword,
} from "../controllers/password.controller.js";

const router = Router();

router.post("/forgot", sendResetPassword);
router.post("/reset", resetPassword);

export default router;
