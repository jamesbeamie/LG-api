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
    publishedArticle.populate("likes", "dislikes");
    res.status(201).json({ publishedArticle, message: "publish successful" });
  } catch (err) {
    res.json({ message: "Error publishing article" });
  }
});

// get all articles

router.get("/", async (req, res) => {
  try {
    const articles = await Article.find().populate("likes dislikes");
    res.status(200).json({ articles });
  } catch (err) {
    res.json({ message: "problem finding articles", err });
  }
});

// specific article
router.get("/:articleId", async (req, res) => {
  const exists = await Article.findById(req.params.articleId).populate(
    "likes dislikes"
  );
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

//edit article
router.patch(
  "/:articleId",
  imageMiddleware,
  authMiddleware,
  async (req, res) => {
    const found = await Article.findById(req.params.articleId);
    if (found) {
      try {
        const { title, description, body } = req.body;
        const updatedArticle = await Article.updateOne(
          {
            _id: req.params.articleId
          },
          {
            $set: {
              title,
              description,
              body,
              updatedAt: new Date(),
              articleImage: req.file.path
            }
          }
        );
        res
          .status(201)
          .json({ article: updatedArticle, message: "Update successful" });
      } catch (err) {
        res.json({
          message: `Error updating article: ${req.params.articleId}`
        });
      }
    } else {
      res.json({
        message: `Article with Id: ${req.params.articleId} not found`
      });
    }
  }
);
//delete an article
router.delete("/:articleId", authMiddleware, async (req, res) => {
  try {
    const exists = await Article.findById(req.params.articleId);
    if (exists) {
      // model.remove is deprecated use deleteOne instead
      const deletedArticle = await Article.deleteOne({
        _id: req.params.articleId
      });
      res.json({ article: deletedArticle, message: "deleted" });
    } else {
      res.json({ message: `sorry :${req.params.articleId} was not found` });
    }
  } catch (err) {
    res.json({ message: `Error deleting :${req.params.articleId}` });
  }
});

module.exports = router;
