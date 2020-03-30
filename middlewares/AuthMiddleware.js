//Checks if user is authenticated

const jwt = require("jsonwebtoken");
require("dotenv/config");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRETE_KEY);
    req.userData = decodedToken;
    next();
  } catch {
    return res.status(401).json({ message: "You are unauthorized" });
  }
};
