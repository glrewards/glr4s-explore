const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  categoryType: {
    type: String,
    lowercase: true,
    required: true,
    unique: true
  }
});

mongoose.model("categories", categorySchema);
