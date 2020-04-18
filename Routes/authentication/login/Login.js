const express = require("express");
const router = express.Router();

// login handler
const {
  userLogin,
} = require("../../../RouteHandlers/authHandlers/LoginHandler");

//Login route
router.post("/login", userLogin);

module.exports = router;
