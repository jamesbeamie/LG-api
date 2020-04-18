const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Bookmarks = require("../../models/BookmarkModels/BookmarkModel");
const Article = require("../../models/ArticleModels/Article");

// bookmarking an article

router.post("/:articleId", async (req, res) => {
  const foundArticle = Article.findById(req.params.articleId);
  const bookmark = new Bookmarks({
    userEmail: req.body.email,
  });
  await bookmark.save();
  console.log(
    "&& req.headers && req.headers.authorization",
    req.headers.authorization
  );
  if (foundArticle && req.headers.authorization) {
    try {
      let authorization = req.headers.authorization.split(" ")[1];
      decoded = jwt.verify(authorization, process.env.JWT_SECRETE_KEY);
      const { id, email } = decoded;
      const user = { id, email };
      console.log("sawa", decoded.email, "mtumizi", user);
      //decode token to get user email
      foundArticle.bookmarkingUsers.push("bookmark");
      res.send("Sawa");
    } catch (err) {
      console.log("mbaya", decoded);
      res.json({ err, message: "error" });
    }
  } else {
    res.json({ message: "Hakuna article" });
  }
});
module.exports = router;
