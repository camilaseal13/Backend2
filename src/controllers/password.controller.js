import PasswordService from "../services/password.service.js";

export const sendResetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const result = await PasswordService.sendResetEmail(email);
    res.send(result);
  } catch (error) {
    res.status(400).send({ status: "error", message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const result = await PasswordService.resetPassword(token, newPassword);
    res.send(result);
  } catch (error) {
    res.status(400).send({ status: "error", message: error.message });
  }
};
