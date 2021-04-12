//demo hot fix
const passport = require("passport");
const crypto = require('crypto');
const mongoose = require("mongoose");
const winston = require("winston");
const keys = require("../config/keys");
const User = mongoose.model("users");

const logger = winston.createLogger({
  level: keys.glrLogLevel,
  defaultMeta: { service: "authRoutes" },
  format: winston.format.timestamp(),
  transports: [new (winston.transports.Console)({'timestamp':true, format: winston.format.combine(
      winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.simple()
    )})]
});
/* handle redirect to google oauth. */

module.exports = app => {
  /* GET login page. */
  app.get("/login", function(req, res) {
    // Display the Login page
    logger.debug("get login page");
    res.redirect("/");
  });

  /* Handle Login POST */
  app.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/api/current_user"
    }),
    (err, req, res, next) => {

      if(err){
        console.error("login error", err.message);
        res.status(404).send({error: 'You must log in'});
      }

    }
  );



  app.get('/register', (req, res, next) => {
    const form = '<h1>Register Page</h1><form method="post" action="register">\
                    Enter Username:<br><input type="text" name="username">\
                    <br>Enter Password:<br><input type="password" name="password">\
                    <br><br><input type="submit" value="Submit"></form>';
    res.send(form);

  });

  app.post('/register', async (req, res, next) => {
    let pwd = req.body;
    console.log(pwd);
    const saltHash = genPassword(req.body.password);
    const salt = saltHash.salt;
    const hash = saltHash.hash;
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      hash: hash,
      salt: salt
    });
     const user = await newUser.save();
     console.debug("user", user);
    res.redirect('/login');
  });

  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/cabinet");
    }
  );

  app.get(
    "/auth/slack",
    passport.authenticate("Slack", {
      scope: ["identity.basic", "identity.email"]
    })
  );

  app.get(
    "/auth/slack/callback",
    passport.authenticate("Slack"),
    (req, res) => {
      res.redirect("/cabinet");
    }
  );

  app.get("/api/logout", (req, res) => {
    logger.debug("logout initiated");
    req.logout();
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    logger.debug('api/current_user',req.user);
    res.send(req.user); //all working
  });
};

function genPassword(password) {
  let salt = crypto.randomBytes(32).toString('hex');
  let genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

  return {
    salt: salt,
    hash: genHash
  };
}
