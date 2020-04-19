const express = require("express");
const router = express.Router();
const passport = require("passport");

//middlewares
const authMiddleware = require("../middlewares/AuthMiddleware");
const uploadImage = require("../middlewares/ImageUploader");
const imageMiddleware = uploadImage.single("articleImage");

// ROUTE HANDLERS

// authentication handlers
const {
  register,
  allUsers,
  specificUser,
  editUser,
  deleteUser,
} = require("../RouteHandlers/authHandlers/SingUpHandler");

// login handler
const { userLogin } = require("../RouteHandlers/authHandlers/LoginHandler");

// pwd reset handlers
const {
  sendLink,
  changePwd,
} = require("../RouteHandlers/authHandlers/pwdResetHandler");

// article handlers
const {
  createArticle,
  getArticles,
  getSpecificArticle,
  editArticle,
  deleteArticle,
} = require("../RouteHandlers/ArticleHandlers/articleHandlers");

// comments handlers
const {
  addComment,
  editComment,
  deleteComment,
} = require("../RouteHandlers/commentsHandlers/commentsHandler");

// like dislike handlers
const { likeArticle } = require("../RouteHandlers/likesHandlers/likesHandler");
const {
  articleDislike,
} = require("../RouteHandlers/dislikesHandlers/dislikeHandler");

// ROUTES

// creating user
router.post("/authentication/signup", register);
// get all users
router.get("/authentication/", allUsers);
// get a specific user
router.get("/authentication/:userId", authMiddleware, specificUser);
// Edit User
router.patch("/authentication/:userId", editUser);
// delete user
router.delete("/authentication/:userId", authMiddleware, deleteUser);

//Login route
router.post("/authentication/login", userLogin);

// reset link
router.post("/pwdreset/reset-link", sendLink);
// update pwd route
router.patch("/pwdreset/reset/:verificationTkn", changePwd);

// route to google:
router.get("/socialauth/google", (req, res) => {
  passport.authenticate("google"),
    {
      scope: ["profile"],
    };
  // google redirects to a a page to chose account
  res.json({ message: "imefika" });
  // after clicking, google redirects to the app route using the callback function
});

// callback route for google redirect
router.get(
  "/socialauth/google/redirect",
  passport.authenticate("google"),
  (req, res) => {
    res.send(" authenticated");
  }
);

// creating an article
router.post("/articles/", imageMiddleware, authMiddleware, createArticle);
// get all articles
router.get("/articles/", getArticles);
// specific article
router.get("/articles/:articleId", getSpecificArticle);
//edit article
router.patch(
  "/articles/:articleId",
  imageMiddleware,
  authMiddleware,
  editArticle
);
//delete an article
router.delete("/articles/:articleId", authMiddleware, deleteArticle);

// create a comment
router.post("/comments/:articleId", authMiddleware, addComment);
// edit a comment=
router.patch("/comments/:commentId", authMiddleware, editComment);
// delete a comment
router.delete("/comments/:commentId", authMiddleware, deleteComment);

// create a like
router.post("/likes/:articleId", likeArticle);
// dislike
router.post("/dislikes/:articleId", articleDislike);

module.exports = router;
