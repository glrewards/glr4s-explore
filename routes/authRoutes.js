const passport = require("passport");
//const mongoose = require("mongoose");


//const user = mongoose.model("users");
/* handle redirect to google oauth. */

module.exports = app => {

  app.get(
    "/auth/google", passport.authenticate("google", {scope: ["profile", "email"]})
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/surveys");
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user); //all working
  });
};
