const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailSender = require("../../../middlewares/NodeMailer");

const User = require("../../../models/authModels/UserModel");

// reset link
router.post("/reset-link", async (req, res) => {
  const { email } = req.body;
  const exists = await User.find({ email });
  if (exists.length >= 1) {
    const token = jwt.sign({ email }, process.env.JWT_SECRETE_KEY, {
      expiresIn: "1hr",
    });
    await User.updateOne(
      {
        email,
      },
      { $set: { verificationTkn: token } }
    );
    await mailSender(email, token);
    res.json({
      message: `A password reset link has been send to ${email}. Check to reset password`,
    });
  } else {
    res.json({ message: "user not found" });
  }
});

// update pwd route
router.patch("/reset/:verificationTkn", async (req, res) => {
  const { password } = req.body;
  const hashedPwd = await bcrypt.hash(password, 12);
  try {
    await User.updateOne(
      {
        verificationTkn: req.params.verificationTkn,
      },
      { $set: { password: hashedPwd, verificationTkn: null } }
    );
    res.status(201).json({
      message: "Update successful",
    });
  } catch (err) {
    res.json({ message: "error updating user" });
  }
});

module.exports = router;
