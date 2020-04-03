const mongoose = require("mongoose");

const likeSchema = mongoose.Schema({
  dislikeValue: {
    type: Number,
    require: true
  },
  dislikedAt: {
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

module.exports = mongoose.model("DisLikes", likeSchema);
