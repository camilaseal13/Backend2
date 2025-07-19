import UsersRepository from "../repositories/users.repository.js";
import { createHash } from "../utils/hash.js";

export default class UsersService {
  static async registerUser({ first_name, last_name, email, age, password }) {
    const exists = await UsersRepository.getUserByEmail(email);
    if (exists) throw new Error("El usuario ya existe");

    const hashedPassword = createHash(password);
    await UsersRepository.createUser({
      first_name,
      last_name,
      email,
      age,
      password: hashedPassword,
    });
    return { status: "success", message: "Usuario registrado" };
  }

  static async listUsers() {
    return UsersRepository.getAllUsers();
  }
}
