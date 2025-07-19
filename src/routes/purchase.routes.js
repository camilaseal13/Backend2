import { Router } from "express";
import { purchase } from "../controllers/purchase.controller.js";
import passport from "passport";

const router = Router();

router.post("/", passport.authenticate("jwt", { session: false }), purchase);

export default router;
