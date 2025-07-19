import { Router } from "express";
import { register, getAll } from "../controllers/users.controller.js";

const router = Router();

router.post("/register", register);
router.get("/", getAll);

export default router;
