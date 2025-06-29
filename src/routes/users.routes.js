import { Router } from "express";
import User from "../models/User.js";
import { createHash } from "../utils/hash.js";

const router = Router();

// 👉 Registrar un nuevo usuario
router.post("/register", async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) {
      return res
        .status(400)
        .send({ status: "error", message: "El usuario ya existe" });
    }

    const hashedPassword = createHash(password);
    const newUser = new User({
      first_name,
      last_name,
      email,
      age,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).send({ status: "success", message: "Usuario registrado" });
  } catch (err) {
    res.status(500).send({ status: "error", error: err.message });
  }
});

// 👉 Obtener todos los usuarios
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Oculta las contraseñas
    res.send({ status: "success", users });
  } catch (err) {
    res.status(500).send({ status: "error", error: err.message });
  }
});

// 👉 Obtener un usuario por ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res
        .status(404)
        .send({ status: "error", message: "Usuario no encontrado" });
    }
    res.send({ status: "success", user });
  } catch (err) {
    res.status(500).send({ status: "error", error: err.message });
  }
});

// 👉 Actualizar un usuario
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res
        .status(404)
        .send({ status: "error", message: "Usuario no encontrado" });
    }
    res.send({ status: "success", updatedUser });
  } catch (err) {
    res.status(500).send({ status: "error", error: err.message });
  }
});

// 👉 Eliminar un usuario
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res
        .status(404)
        .send({ status: "error", message: "Usuario no encontrado" });
    }
    res.send({ status: "success", message: "Usuario eliminado" });
  } catch (err) {
    res.status(500).send({ status: "error", error: err.message });
  }
});

export default router;
