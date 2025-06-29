import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const router = Router();

router.post(
  "/login",
  passport.authenticate("login", { session: false }),
  (req, res) => {
    const user = req.user;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.send({ status: "success", token });
  }
);

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send({ status: "success", user: req.user });
  }
);

export default router;
