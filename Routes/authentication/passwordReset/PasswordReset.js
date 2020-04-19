const express = require("express");
const router = express.Router();

// handlers
const {
  sendLink,
  changePwd,
} = require("../../../RouteHandlers/authHandlers/pwdResetHandler");

// reset link
router.post("/reset-link", sendLink);

// update pwd route
router.patch("/reset/:verificationTkn", changePwd);

module.exports = router;
