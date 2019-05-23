const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const _ = require("lodash");
const Path = require("path-parser").default;
const { URL } = require("url");

const Category = mongoose.model("categories");

module.exports = app => {
  app.post("/api/categories", requireLogin, async (req, res) => {
    console.log(req.body);
    const { categoryType } = req.body;
    console.log(categoryType);
    const cat = new Category({
      categoryType
    });
    try {
      await cat.save();
      console.log("saved category",cat);
      res.send(cat);
    } catch (err) {
      console.error("error saving category: ", cat);
      res.status(403).send(err);
    }
  });
};
