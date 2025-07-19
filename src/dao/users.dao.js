import User from "../models/User.js";

export default class UsersDAO {
  static async getByEmail(email) {
    return User.findOne({ email });
  }

  static async create(userData) {
    const user = new User(userData);
    return user.save();
  }

  static async getAll() {
    return User.find().select("-password");
  }

  static async getById(id) {
    return User.findById(id);
  }
}
