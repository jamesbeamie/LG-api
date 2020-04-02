let mongoose = require("mongoose");

const Schema = mongoose.Schema;

let articleSchema = new Schema({
  title: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  body: {
    type: String,
    require: true
  },
  articleImage: {
    type: String,
    require: true
  },
  createdAt: {
    type: Date,
    require: true
  },
  updatedAt: {
    type: Date
  }
});

module.exports = mongoose.model("Article", articleSchema);
