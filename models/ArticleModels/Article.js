const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  body: {
    type: String,
    require: true,
  },
  articleImage: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    require: true,
  },
  updatedAt: {
    type: Date,
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Likes" }],
  dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "DisLikes" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comments" }],
  bookmarkingUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Article", articleSchema);
