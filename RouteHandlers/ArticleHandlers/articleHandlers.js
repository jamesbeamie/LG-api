const Article = require("../../models/ArticleModels/Article");

// posting an article
const createArticle = async (req, res) => {
  const { title, description, body } = req.body;
  const newArticle = new Article({
    title,
    description,
    articleImage: req.file.path,
    body,
    createdAt: new Date(),
  });

  try {
    const publishedArticle = await newArticle.save();
    publishedArticle.populate("likes", "dislikes");
    res.status(201).json({ publishedArticle, message: "publish successful" });
  } catch (err) {
    res.json({ message: "Error publishing article" });
  }
};

// fetch all articles
const getArticles = async (req, res) => {
  try {
    const articles = await Article.find().populate("likes dislikes comments");
    res.status(200);
    res.json({ articles });
  } catch (err) {
    res.json({ message: "problem finding articles", err });
  }
};

// get specific article

const getSpecificArticle = async (req, res) => {
  const exists = await Article.findById(req.params.articleId).populate(
    "likes dislikes comments"
  );
  if (exists) {
    try {
      res
        .status(200)
        .json({ article: exists, message: "article retrieved successfully" });
    } catch (err) {
      res.json({
        message: `error fetching article with ID${req.params.articleId}`,
        err,
      });
    }
  } else {
    res.json({ message: `Article ${req.params.articleId} not found` });
  }
};

// edit an article

const editArticle = async (req, res) => {
  const found = await Article.findById(req.params.articleId);
  if (found) {
    try {
      const { title, description, body } = req.body;
      const updatedArticle = await Article.updateOne(
        {
          _id: req.params.articleId,
        },
        {
          $set: {
            title,
            description,
            body,
            updatedAt: new Date(),
            articleImage: req.file.path,
          },
        }
      );
      res.status(201).json({
        article: updatedArticle,
        message: "Update successful",
      });
    } catch (err) {
      res.json({
        message: `Error updating article: ${req.params.articleId}`,
      });
    }
  } else {
    res.json({
      message: `Article with Id: ${req.params.articleId} not found`,
    });
  }
};

// delete article

const deleteArticle = async (req, res) => {
  try {
    const exists = await Article.findById(req.params.articleId);
    if (exists) {
      // model.remove is deprecated use deleteOne instead
      const deletedArticle = await Article.deleteOne({
        _id: req.params.articleId,
      });
      res.json({ article: deletedArticle, message: "deleted" });
    } else {
      res.json({ message: `sorry :${req.params.articleId} was not found` });
    }
  } catch (err) {
    res.json({ message: `Error deleting :${req.params.articleId}` });
  }
};
module.exports = {
  createArticle,
  getArticles,
  getSpecificArticle,
  editArticle,
  deleteArticle,
};
