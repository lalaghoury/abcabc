const User = require("../models/User");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

module.exports = authController = {
  signUp: async (req, res) => {
    try {
      if (!req.body.email || !req.body.name || !req.body.password) {
        return res
          .status(400)
          .json({ message: "All fields are required", success: false });
      }

      const existingUser = await User.findOne({ email: req.body.email });

      if (existingUser) {
        return res
          .status(400)
          .json({ message: "Email already exists", success: false });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });

      const savedUser = await newUser.save();
      res.status(201).json({
        message: "Account created successfully",
        success: true,
        savedUser,
      });
    } catch (error) {
      res.status(400).json({ message: error.message, success: false });
    }
  },

  signIn: async (req, res) => {
    try {
      if (!req.body.email || !req.body.password) {
        return res
          .status(400)
          .json({ message: "All fields are required", success: false });
      }

      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({
          message: "User with that email does not exist!",
          success: false,
        });
      }

      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Invalid Password", success: false });
      }

      const token = JWT.sign(
        {
          userId: user._id,
          email: user.email,
        },
        process.env.JWT_SECRET_KEY
      );

      res.cookie("token", token, {
        httpOnly: true,
        sameSite: true,
        secure: true,
      });
      res.json({ message: "Sign in successful!", success: true, token, user });
    } catch (error) {
      res.status(400).json({ message: error.message, success: false });
    }
  },

  signOut: (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Successfully logged out.", success: true });
  },

  verifySignin: (req, res) => {
    res.status(200).send({ success: true });
  },
};
