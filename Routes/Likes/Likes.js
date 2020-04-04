const express = require("express");
const router = express.Router();

const Likes = require("../../models/LikesModel/LikeModel");
const Article = require("../../models/ArticleModels/Article");

// create a like
router.post("/:articleId", async (req, res) => {
  const { likeValue } = req.body;

  try {
    const like = new Likes({ likeValue, likedAt: new Date() });
    const liked = await like.save();

    const articleToLike = await Article.findById(req.params.articleId);
    // update the likedArticles array in the user model
    articleToLike.likes.push(liked);
    await articleToLike.save();
    console.log(articleToLike);
    res.status(201).json({ liked, message: "liked article" });
  } catch (err) {
    res.json({ message: "could not submit like" });
  }
});

module.exports = router;
