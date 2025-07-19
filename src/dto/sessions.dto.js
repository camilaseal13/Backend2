export const userDTO = (user) => ({
  id: user._id,
  email: user.email,
  role: user.role,
});
