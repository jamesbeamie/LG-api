const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");

//module imports
// routes imports
const userRoutes = require("./Routes/authentication/registration/User");
const loginRoutes = require("./Routes/authentication/login/Login");
const socialAuthRoute = require("./Routes/authentication/socialAuth/GoogleAuth");
const articlesRoutes = require("./Routes/Articles/Articles");
// must be imported for passport config to rub
const passport = require("./middlewares/PassportConfig");

const app = express();

//middlewares
app.use(bodyParser.json());
app.use(cors());

// routes
app.use("/authentication", userRoutes);
app.use("/authentication", loginRoutes);
app.use("/socialauth", socialAuthRoute);
app.use("/articles", articlesRoutes);

// server
mongoose
  .connect(
    // atlas
    // `${process.env.ATLAS_DB}`,
    //local DB
    `${process.env.LOCAL_DB}`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(`${process.env.PORT}` || 5000);
    console.log(`app listening to http://127.0.0.1:${process.env.PORT || 5000} )`);
  })
  .catch(err => {
    throw err;
  });
