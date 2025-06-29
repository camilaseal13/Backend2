import passport from "passport";
import local from "passport-local";
import User from "../models/User.js";
import { isValidPassword } from "../utils/hash.js";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import dotenv from "dotenv";

dotenv.config();
const LocalStrategy = local.Strategy;

const JWT_SECRET = process.env.JWT_SECRET;

const initializePassport = () => {
  // Estrategia local
  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        const user = await User.findOne({ email });
        if (!user || !isValidPassword(user, password)) return done(null, false);
        return done(null, user);
      }
    )
  );

  // Estrategia JWT
  passport.use(
    "jwt",
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: JWT_SECRET,
      },
      async (jwt_payload, done) => {
        const user = await User.findById(jwt_payload.id);
        if (!user) return done(null, false);
        return done(null, user);
      }
    )
  );
};

export default initializePassport;
