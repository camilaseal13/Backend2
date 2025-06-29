import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import passport from "passport";
import sessionRouter from "./routes/sessions.routes.js";
import userRouter from "./routes/users.routes.js";
import initializePassport from "./config/passport.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Página de prueba pre-entrega 1 🎉");
});

// Passport
initializePassport();
app.use(passport.initialize());

// Rutas
app.use("/api/users", userRouter);
app.use("/api/sessions", sessionRouter);

// Conexión a Mongo
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB conectado");
    app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
  })
  .catch((err) => console.error("Error conectando a MongoDB", err));
