const mongoose = require("mongoose"); //note how we are not requiring in our Model classes here - just mongoose
const passport = require("passport");
const crypto = require('crypto');
let GoogleStrategy = require("passport-google-oauth20").Strategy;
let SlackStrategy = require("passport-slack-oauth2").Strategy;
let LocalStrategy = require("passport-local").Strategy;
const keys = require("../config/keys");

let User = mongoose.model("users"); //This is how we reference our model class as user - Not using require
//const Student = mongoose.model("students");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .populate("_student")
    .then(user => {
      done(null, user);
    });
});

passport.use(
  new LocalStrategy(
    async (username, password, done) => {
      // check in mongo if a user with username exists or not
      const existingUser = await User.findOne({ username: username }).populate(
        "_student"
      );
      if (!existingUser) {
        return done(null, false);
      }
      const isValid = validPassword(password, existingUser.hash,existingUser.salt);
      if (isValid) {
        return done(null, existingUser);
      }else {
          return done(null, false);
      }
    }
  )
);

function validPassword(password, hash, salt) {
    let hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
}

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
        //console.log("in google strategy", accessToken, refreshToken,profile);
      const existingUser = await User.findOne({
        googleId: profile.id
      }).populate("_student");
      if (existingUser) {
        done(null, existingUser);
      } else {
        return done(null, false, req.flash("message", "User Not found."));
      }

      //console.log(profile.id);
    }
  )
);

passport.use(
  new SlackStrategy(
    {
      clientID: keys.slackClientID,
      clientSecret: keys.slackClientSecret,
      callbackURL: "/auth/slack/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ slackId: profile.id }).populate(
        "_student"
      );
      if (existingUser) {
        //it must exist
        done(null, existingUser);
      } else {
        return done(null, false, req.flash("message", "User Not found."));
      }

      //console.log(profile.id);
    }
  )
);
