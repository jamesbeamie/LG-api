const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middlewares/AuthMiddleware");

// handlers
const {
  addComment,
  editComment,
  deleteComment,
} = require("../../RouteHandlers/commentsHandlers/commentsHandler");

// create a comment
router.post("/:articleId", authMiddleware, addComment);

// edit a comment=
router.patch("/:commentId", authMiddleware, editComment);

// delete a comment
router.delete("/:commentId", authMiddleware, deleteComment);

module.exports = router;
