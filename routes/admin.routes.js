const express = require("express");
const { registerAdmin, loginAdmin } = require("../controllers/admin.controller");

const router = express.Router();

router.post("/auth/sign-up", registerAdmin);
router.post("/auth/login", loginAdmin);

module.exports = router;