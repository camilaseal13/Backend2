export const authorizeRoles = (allowedRoles) => {
  return (req, res, next) => {
    const user = req.user;
    if (!user) {
      return res.status(401).send({ status: "error", message: "Unauthorized" });
    }

    if (!allowedRoles.includes(user.role)) {
      return res
        .status(403)
        .send({ status: "error", message: "Forbidden: insufficient role" });
    }

    next();
  };
};
