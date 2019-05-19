const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplates");
const _ = require("lodash");
const Path = require("path-parser").default;
const { URL } = require("url");

//const Survey = mongoose.model("surveys");

//TODO: I need to handle pagination and link control of this to the GUI - this will require request Arguements
//TODO: and linking these to how graphql works
//TODO: For now, I will just retrieve the first 5 products so I can focus on the metafields and the order flow



module.exports = app => {
    app.get('/api/shop/products', requireLogin, (req, res) => {
        res.send("made it");
        });

};
