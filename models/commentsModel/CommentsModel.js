const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  comment: {
    type: String,
    require: true,
  },
  commentedAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
  article: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Article",
  },
});

module.exports = mongoose.model("Comments", commentSchema);
