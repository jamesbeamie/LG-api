const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookmarkModel = new Schema({
  userEmail: {
    type: String,
  },
  bookmarkingusers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  bookmarkedArticles: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Article" },
  ],
});

module.exports = mongoose.model("Bookmarks", bookmarkModel);
