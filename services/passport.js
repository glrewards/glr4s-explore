const mongoose = require("mongoose"); //note how we are not requiring in our Model classes here - just mongoose
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");

const User = mongoose.model("users"); //This is how we reference our model class as user - Not using require

passport.serializeUser((user, done) => {
  //console.log(user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        //it must exist
        done(null, existingUser);
      } else {
        //it does not exist in db - create
        const user = await new User({ googleId: profile.id }).save();
        done(null,user);
      }

      //console.log(profile.id);
    }
  )
);
