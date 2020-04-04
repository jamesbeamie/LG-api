const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middlewares/AuthMiddleware");
const Article = require("../../models/ArticleModels/Article");
const Comments = require("../../models/commentsModel/CommentsModel");

// create a comment
router.post("/:articleId", authMiddleware, async (req, res) => {
  const { comment } = req.body;

  const articleToComment = await Article.findById(req.params.articleId);
  if (articleToComment) {
    try {
      const newComment = new Comments({
        comment,
        commentedAt: new Date(),
      });

      await newComment.save();
      articleToComment.comments.push(newComment);
      await articleToComment.save();
      res.status(201).json({ newComment, message: "commented" });
    } catch (err) {
      res.json({ message: "Error commenting on this post" });
    }
  } else {
    res.json({ message: "Probblem finding article" });
  }
});

// edit a comment=
router.patch("/:commentId", authMiddleware, async (req, res) => {
  const commentIsAvailable = await Comments.findById(req.params.commentId);
  if (commentIsAvailable) {
    const { comment } = req.body;
    const editedComment = await Comments.updateOne(
      { _id: req.params.commentId },
      { $set: { comment } }
    );
    res.status(201).json({ editedComment, message: "Comment edited" });
  } else {
    res.json({
      message: "The comment you are trying to edit is not available",
    });
  }
});

// delete a comment
router.delete("/:commentId", authMiddleware, async (req, res) => {
  const commentExists = await Comments.findById(req.params.commentId);
  if (commentExists) {
    await Comments.deleteOne({ _id: req.params.commentId });
    res.status(200).json({ message: "Comment deleted" });
  } else {
    res.json({ message: "Problem finding this comment" });
  }
});

module.exports = router;
