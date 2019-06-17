const mongoose = require("mongoose");
const { Schema } = mongoose;
const KeySchema = require("./Key");

const AdminSchema = new Schema({
  xodToken: KeySchema

});

mongoose.model("admin", AdminSchema);
