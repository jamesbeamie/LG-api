const mongoose = require("mongoose");

const likeSchema = mongoose.Schema({
  likeValue: {
    type: Number,
    require: true
  },
  likedAt: {
    type: Date,
    require: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  article: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Article"
  }
});

module.exports = mongoose.model("Likes", likeSchema);
