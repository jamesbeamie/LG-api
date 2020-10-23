const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const articleSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  location: {
    type: String,
    require: true
  },
  specialty: {
    type: String,
    require: true
  },
  workHours: {
    type: String,
    require: true
  },
  mobile: {
    type: String,
    require: true
  },
  updatedAt: {
    type: Date
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Likes" }],
  dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "DisLikes" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comments" }]
});

module.exports = mongoose.model("Article", articleSchema);
