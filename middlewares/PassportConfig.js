const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
require("dotenv/config");
const GoogleUser = require("../models/authModels/socialAuthModel/googleAuthModel");

passport.use(
  new GoogleStrategy(
    {
      callbackURL: "/socialauth/google/redirect",
      clientID: `${process.env.CLIENT_ID}`,
      clientSecrete: `${process.env.CLIENT_SECRETE}`
    },
    (accessToken, refreshToken, profile, done) => {
      GoogleUser.findOne({ googleId: profile.id })
        .then(foundUser => {
          if (foundUser) {
            done(null, foundUser);
            return json({ message: `Found user: ${theUser}` });
          } else {
            const authenticatedUser = new GoogleUser({
              username: profile.displayName,
              googleId: profile.id
            });
            authenticatedUser
              .save()
              .then(theUser => {
                return json({
                  theUser,
                  accessTkn: accessToken,
                  refreshTkn: refreshToken
                });
              })
              .catch(err => {
                return json({ message: `Haijasave${err}` });
              });

            done(null, authenticatedUser);
          }
        })
        .catch(err => {
          return json({ message: `Error kubwa${err}` });
        });
    }
  )
);
