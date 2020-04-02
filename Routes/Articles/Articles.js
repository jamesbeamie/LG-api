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

module.exports = router;
