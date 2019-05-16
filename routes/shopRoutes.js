const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplates");
const _ = require("lodash");
const Path = require("path-parser").default;
const { URL } = require("url");

//const Survey = mongoose.model("surveys");

module.exports = app => {
    app.get('/api/shop', requireLogin, (req, res) => {
        res.send("made it");
        });

};
