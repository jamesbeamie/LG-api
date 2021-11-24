const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");

// routes imports
const apiRoutes = require("./Routes");

// must be imported for passport config to rub
const passport = require("./middlewares/PassportConfig");

const app = express();

//middlewares
app.use(bodyParser.json());
app.use(cors());

//routes
app.use("/api/V1", apiRoutes);

// server
mongoose
  .connect(`${process.env.LOCAL_DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(`${process.env.PORT}` || 5000);
    console.log(
      `app listening to http://127.0.0.1:${process.env.PORT || 5000} )`
    );
  })
  .catch((err) => {
    throw err;
  });
