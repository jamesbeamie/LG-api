const Likes = require("../../models/LikesModel/LikeModel");
const Article = require("../../models/ArticleModels/Article");

// like

const likeArticle = async (req, res) => {
  const { likeValue } = req.body;

  try {
    const like = new Likes({ likeValue, likedAt: new Date() });
    const liked = await like.save();

    const articleToLike = await Article.findById(req.params.articleId);
    // update the likedArticles array in the user model
    articleToLike.likes.push(liked);
    await articleToLike.save();
    res.status(201).json({ liked, message: "liked garage" });
  } catch (err) {
    res.json({ message: "could not submit like" });
  }
};

module.exports = { likeArticle };
