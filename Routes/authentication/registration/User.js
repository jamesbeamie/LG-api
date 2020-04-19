const express = require("express");
const router = express.Router();

// custom middlewares
const checkAuthentication = require("../../../middlewares/AuthMiddleware");

// handlers
const {
  register,
  allUsers,
  specificUser,
  editUser,
  deleteUser,
} = require("../../../RouteHandlers/authHandlers/SingUpHandler");

// creating user
router.post("/signup", register);
// get all users
router.get("/", allUsers);
// get a specific user
router.get("/:userId", checkAuthentication, specificUser);
// Edit User
router.patch("/:userId", editUser);
// delete user
router.delete("/:userId", checkAuthentication, deleteUser);

module.exports = router;
