import UsersDAO from "../dao/users.dao.js";

export default class UsersRepository {
  static async getUserByEmail(email) {
    return UsersDAO.getByEmail(email);
  }

  static async createUser(userData) {
    return UsersDAO.create(userData);
  }

  static async getAllUsers() {
    return UsersDAO.getAll();
  }

  static async getUserById(id) {
    return UsersDAO.getById(id);
  }
}
