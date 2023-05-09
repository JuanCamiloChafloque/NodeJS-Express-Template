const express = require("express");
const { getHome } = require("../controllers/appController");
const auth = require("../middleware/auth");

const router = express.Router();

router.route("/").get(auth, getHome);

module.exports = router;
