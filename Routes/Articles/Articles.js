const express = require("express");
const router = express.Router();

const Article = require("../../models/ArticleModels/Article");

//middlewares
const authMiddleware = require("../../middlewares/AuthMiddleware");
const uploadImage = require("../../middlewares/ImageUploader");

const imageMiddleware = uploadImage.single("articleImage");

// creating an article
router.post("/", imageMiddleware, authMiddleware, async (req, res) => {
  const { title, description, body } = req.body;
  const newArticle = new Article({
    title,
    description,
    articleImage: req.file.path,
    body,
    createdAt: new Date()
  });

  try {
    const publishedArticle = await newArticle.save();
    res.status(201).json({ publishedArticle, message: "publish successful" });
  } catch (err) {
    res.json({ message: "Error publishing article" });
  }
});

// get all articles

router.get("/", async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json({ articles });
  } catch (err) {
    res.json({ message: "problem finding articles", err });
  }
});

// specific article
router.get("/:articleId", async (req, res) => {
  const exists = await Article.findById(req.params.articleId);
  if (exists) {
    try {
      res
        .status(200)
        .json({ article: exists, message: "article retrieved successfully" });
    } catch (err) {
      res.json({
        message: `error fetching article with ID${req.params.articleId}`,
        err
      });
    }
  } else {
    res.json({ message: `Article ${req.params.articleId} not found` });
  }
});

module.exports = router;
