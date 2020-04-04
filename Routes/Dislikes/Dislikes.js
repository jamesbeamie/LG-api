const express = require("express");
const router = express.Router();

const DisLikes = require("../../models/DislikeModal/DisLikeModel");
const Article = require("../../models/ArticleModels/Article");

// create a like
router.post("/:articleId", async (req, res) => {
  const { dislikeValue } = req.body;

  try {
    const dislike = new DisLikes({ dislikeValue, dislikedAt: new Date() });
    const disliked = await dislike.save();

    const articleToDissike = await Article.findById(req.params.articleId);
    // update the likedArticles array in the user model
    articleToDissike.dislikes.push(disliked);
    await articleToDissike.save();
    console.log(articleToDissike);
    res.status(201).json({ disliked, message: "disliked article" });
  } catch (err) {
    res.json({ message: "could not submit dislike" });
  }
});

module.exports = router;
