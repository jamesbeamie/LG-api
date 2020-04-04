const express = require("express");
const router = express.Router();
const Article = require("../../models/ArticleModels/Article");
const Comments = require("../../models/commentsModel/CommentsModel");

// create a comment
router.post("/:articleId", async (req, res) => {
  const { comment } = req.body;

  const articleToComment = await Article.findById(req.params.articleId);
  if (articleToComment) {
    try {
      const newComment = new Comments({
        comment,
        commentedAt: new Date()
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

module.exports = router;