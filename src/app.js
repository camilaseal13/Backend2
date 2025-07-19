import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import passport from "passport";

import sessionRouter from "./routes/sessions.routes.js";
import userRouter from "./routes/users.routes.js";
import passwordRouter from "./routes/password.routes.js";
import purchaseRouter from "./routes/purchase.routes.js";

import initializePassport from "./config/passport.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Ecommerce Final ✔️");
});

initializePassport();
app.use(passport.initialize());

app.use("/api/users", userRouter);
app.use("/api/sessions", sessionRouter);
app.use("/api/password", passwordRouter);
app.use("/api/purchase", purchaseRouter);

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB conectado");
    app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
  })
  .catch((err) => console.error("Error conectando a MongoDB:", err));

export default app;
