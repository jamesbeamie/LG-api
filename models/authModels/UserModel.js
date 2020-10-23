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
  mobile:{
    type: String,
    required: true,},
  userType:{
    type: String,
    required: true,},
  location: {
    type: String,
    required: true,
  },
  workHours: {
    type: String,
    required: true,
  },
  verificationTkn: {
    type: String,
  },
  likedArticles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Likes" }],
});

module.exports = mongoose.model("User", userSchema);
