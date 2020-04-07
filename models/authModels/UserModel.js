const mongoose = require("mongoose");

// Posts Schema

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  verificationTkn: {
    type: String,
  },
  likedArticles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Likes" }],
  bookmarkdArticles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Article" }],
});

module.exports = mongoose.model("User", userSchema);
