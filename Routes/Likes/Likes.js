const express = require("express");
const router = express.Router();

const {
  likeArticle,
} = require("../../RouteHandlers/likesHandlers/likesHandler");

// create a like
router.post("/:articleId", likeArticle);

module.exports = router;
