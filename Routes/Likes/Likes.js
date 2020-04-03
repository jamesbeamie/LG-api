const express = require("express");
const router = express.Router();

const Likes = require("../../models/LikesModel/LikeModel");
// const User = require("../../models/authModels/UserModel");
const Article = require("../../models/ArticleModels/Article");

// create a like
router.post("/:articleId", async (req, res) => {
  const { likeValue, likedAt } = req.body;

  try {
    const like = new Likes({ likeValue, likedAt });
    const liked = await like.save();

    const articleToLike = await Article.findById(req.params.articleId);
    // update the likedArticles array in the user model
    articleToLike.likes.push(liked);
    await articleToLike.save();
    // await Likes.populate("user");
    console.log(articleToLike);
    res.status(201).json({ liked, message: "liked article" });
  } catch (err) {
    res.json({ message: "could not submit like" });
  }
});

module.exports = router;
