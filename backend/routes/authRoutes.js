const express = require("express");
const rateLimiter = require("express-rate-limit");
const {
  login,
  register,
  updateUser,
} = require("../controllers/authController");
const auth = require("../middleware/auth");

const router = express.Router();

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, //15 mins
  max: 10,
  message:
    "Too many requests from this IP address, please try again after 15 minutes",
});

router.route("/register").post(apiLimiter, register);
router.route("/login").post(apiLimiter, login);
router.route("/update").patch(auth, updateUser);

module.exports = router;
