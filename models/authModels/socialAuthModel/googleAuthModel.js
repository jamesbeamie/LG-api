let mongoose = require("mongoose");

// Posts Schema

let userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  googleId: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("GoogleUser", userSchema);
