import SessionsService from "../services/sessions.service.js";

export const login = async (req, res) => {
  const token = await SessionsService.login(req.user);
  res.send({ status: "success", token });
};

export const current = async (req, res) => {
  const user = SessionsService.getCurrentUser(req.user);
  res.send({ status: "success", user });
};
