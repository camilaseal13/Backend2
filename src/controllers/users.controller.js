import UsersService from "../services/users.service.js";

export const register = async (req, res) => {
  try {
    const response = await UsersService.registerUser(req.body);
    res.status(201).send(response);
  } catch (error) {
    res.status(400).send({ status: "error", message: error.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const users = await UsersService.listUsers();
    res.send({ status: "success", users });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
};
