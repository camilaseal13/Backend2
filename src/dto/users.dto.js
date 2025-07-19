export const userBasicDTO = (user) => ({
  id: user._id,
  email: user.email,
  first_name: user.first_name,
  last_name: user.last_name,
});
