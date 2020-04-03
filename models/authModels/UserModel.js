const mongoose = require("mongoose");

// Posts Schema

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  likedArticles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Likes" }]
});

module.exports = mongoose.model("User", userSchema);
