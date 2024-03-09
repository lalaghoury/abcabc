const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController.js");
const { requireSignin, isAdmin } = require("../middlewares/authMiddleware");

router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);
router.post("/signout", authController.signOut);
router.get("/verify", requireSignin, authController.verifySignin);
router.get(
  "/verify/admin",
  requireSignin,
  isAdmin,
  authController.verifySignin
);

module.exports = router;
