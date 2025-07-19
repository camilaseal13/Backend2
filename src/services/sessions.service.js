import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { userDTO } from "../dto/sessions.dto.js";
dotenv.config();

export default class SessionsService {
  static async login(user) {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  }

  static getCurrentUser(user) {
    return userDTO(user);
  }
}
