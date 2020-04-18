const express = require("express");
const router = express.Router();

// handler
const {
  createArticle,
  getArticles,
  getSpecificArticle,
  editArticle,
  deleteArticle,
} = require("../../RouteHandlers/ArticleHandlers/articleHandlers");

//middlewares
const authMiddleware = require("../../middlewares/AuthMiddleware");
const uploadImage = require("../../middlewares/ImageUploader");

const imageMiddleware = uploadImage.single("articleImage");

// creating an article
router.post("/", imageMiddleware, authMiddleware, createArticle);

// get all articles

router.get("/", getArticles);

// specific article
router.get("/:articleId", getSpecificArticle);

//edit article
router.patch("/:articleId", imageMiddleware, authMiddleware, editArticle);
//delete an article
router.delete("/:articleId", authMiddleware, deleteArticle);

module.exports = router;
