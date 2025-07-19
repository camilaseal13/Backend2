import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UsersRepository from "../repositories/users.repository.js";
import { createHash, isValidPassword } from "../utils/hash.js";
import { transporter } from "../config/mailer.js";
dotenv.config();

class PasswordService {
  static async sendResetEmail(email) {
    const user = await UsersRepository.getUserByEmail(email);
    if (!user) throw new Error("Usuario no encontrado");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${token}`;

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: user.email,
      subject: "Recuperación de contraseña",
      html: `<p>Haz click para restablecer tu contraseña: <a href="${resetLink}">Restablecer</a></p>`,
    });

    return { status: "success", message: "Correo enviado" };
  }

  static async resetPassword(token, newPassword) {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UsersRepository.getUserById(id);
    if (!user) throw new Error("Token inválido o expirado");
    if (isValidPassword(user, newPassword))
      throw new Error("No puedes usar la misma contraseña");

    user.password = createHash(newPassword);
    await user.save();
    return {
      status: "success",
      message: "Contraseña actualizada correctamente",
    };
  }
}

export default PasswordService;
