const express = require("express");
const router = express.Router();
const mailSender = require("../../../middlewares/NodeMailer");

const User = require("../../../models/authModels/UserModel");

// reset link

router.post("/reset-link", async (req, res) => {
  const { email } = req.body;
  const exists = await User.find({ email });
  if (exists.length >= 1) {
    res.json({
      message: `A password reset link has been send to ${email}. Check to reset password`,
    });
    await mailSender(email);
  } else {
    res.json({ message: "user not found" });
  }
});

module.exports = router;
