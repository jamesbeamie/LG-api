const multer = require("multer");

const multerStorage = multer.diskStorage({
  // where to store
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  // how to name the file
  filename: (req, file, cb) => {
    // use original name of the file
    cb(null, file.originalname);
  }
});

const imageFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, false);
  } else {
    cb(new Error("Cannot store that file type"), true);
  }
};

const uploadImage = multer({
  storage: multerStorage,
  limits: { fileSize: 1024 * 1024 * 5 },
  imageFilter
});

module.exports = uploadImage;
