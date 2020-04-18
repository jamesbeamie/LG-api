const bcrypt = require("bcrypt");
const User = require("../../models/authModels/UserModel");

const validEmail = (email) => {
  let regx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regx.test(email);
};

const validPwd = (pwd) => {
  var re = /^(?=.*[a-z]){3,}(?=.*[A-Z]){2,}(?=.*[0-9]){2,}(?=.*[!@#$%^&*()--__+.]){1,}.{8,}$/;
  return re.test(pwd);
};

// POST register route
const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const exists = await User.find({ email });
    if (exists.length >= 1) {
      return res.status(422).json({ message: "email already used" });
    } else {
      if (validPwd(password) && validEmail(email)) {
        hashedPwd = await bcrypt.hash(password, 12, (err, hash) => {
          if (err) {
            return res.status(500).json({
              message: `the error :${err}`,
            });
          } else {
            const newUser = new User({
              username,
              email,
              password: hash,
            });

            newUser.save();
            newUser.populate("likedArticles");
            res.status(201).json({ savedUser: newUser, message: "Created" });
          }
        });
      } else {
        return res.status(500).json({
          message: `Email must be of the formart example@email.com and password  atleast1numberspeci@lcharactorandCapital`,
        });
      }
    }
  } catch (err) {
    res.status(400);
    res.json({ message: "Error registering user" });
  }
};

// get all users
const allUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json({ message: `sorry, could not find user` });
  }
};

// get a specific user
const specificUser = async (req, res) => {
  try {
    const exists = await User.findById(req.params.userId);
    if (exists) {
      res.json(exists);
    } else {
      res.json({ message: `sorry user was not found` });
    }
  } catch (err) {
    res.json({ message: `sorry, user:${req.params.userId} was not found` });
  }
};

// update user credentials
const editUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const exists = await User.findById(req.params.userId);
    if (exists) {
      hashedPwd = await bcrypt.hash(password, 12, (err, hash) => {
        if (err) {
          return res.status(500).json({
            message: `the error :${err}`,
          });
        } else {
          User.updateOne(
            { _id: req.params.userId },
            {
              $set: {
                username,
                email,
                password: hash,
              },
            }
          );
          res.status(200).json({ message: "Edited" });
        }
      });
    } else {
      res.json({ message: `sorry, user :${req.params.userId} was not found` });
    }
  } catch (err) {
    res.json({ message: `Error Editing :${req.params.userId}` });
  }
};

// delete user

const deleteUser = async (req, res) => {
  try {
    const exists = await User.findById(req.params.userId);
    if (exists) {
      await User.remove({ _id: req.params.userId });
      res.status(200).json({ message: "deleted" });
    } else {
      res.json({ message: `sorry :${req.params.userId} was not found` });
    }
  } catch (err) {
    res.json({ message: `Error deleting :${req.params.userId}` });
  }
};

module.exports = { register, allUsers, specificUser, editUser, deleteUser };
