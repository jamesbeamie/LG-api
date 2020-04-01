const express = require("express");
const router = express.Router();
const passport = require("passport");

// route to google:
router.get("/google", (req, res) => {
  passport.authenticate("google"),
    {
      scope: ["profile"]
    };
  // google redirects to a a page to chose account
  res.json({ message: "imefika" });
  // after clicking, google redirects to the app route using the callback function
});

// callback route for google redirect
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.send(" authenticated");
});

module.exports = router;
