const mongoose = require("mongoose");
const { Schema } = mongoose;

const rewardTypeSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  }
});

mongoose.model("RewardTypes", rewardTypeSchema);