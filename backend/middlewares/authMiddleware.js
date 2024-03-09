const User = require("../models/User");
const JWT = require("jsonwebtoken");

const requireSignin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Bearer token

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided.", success: false });
  }

  try {
    const decode = JWT.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decode;
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ message: "Invalid token", success: false, error });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    if (user.role === "admin") {
      next();
    } else {
      return res.status(401).send({ success: false, message: "Unauthorized" });
    }
  } catch (error) {
    res.status(401).send({ success: false, message: "Unauthorized", error });
  }
};

module.exports = { requireSignin, isAdmin };
