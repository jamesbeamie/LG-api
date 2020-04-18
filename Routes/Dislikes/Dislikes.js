const express = require("express");
const router = express.Router();

// handler
const {
  articleDislike,
} = require("../../RouteHandlers/dislikesHandlers/dislikeHandler");

// dislike
router.post("/:articleId", articleDislike);

module.exports = router;
