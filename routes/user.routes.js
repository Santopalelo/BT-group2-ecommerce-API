const express = require("express");
const { registerUser, loginUser } = require("../controllers/user.controller");
const registerAdmin = require("../controllers/admin.controller")

const router = express.Router();

router.post("/sign-up",registerUser);
router.post("/admin/sign-up",registerAdmin);
router.post("/login",loginUser);

module.exports= router;