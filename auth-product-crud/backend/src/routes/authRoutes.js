const express = require("express");
const router = express.Router();

const { register, login, getMe, refreshAccessToken, logout } = require("../controllers/authController");
const { registerValidator, loginValidator } = require("../middlewares/validators/authValidators");
const handleValidationErrors = require("../middlewares/handleValidationErrors");
const authenticate = require("../middlewares/authenticate");

router.post("/register", registerValidator, handleValidationErrors, register);
router.post("/login", loginValidator, handleValidationErrors, login);
router.get("/me", authenticate, getMe);
router.post("/refresh-token", refreshAccessToken);
router.post("/logout", authenticate, logout);

module.exports = router;