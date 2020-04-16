const mongoose = require("mongoose");
const { Schema } = mongoose;

const rewardTypeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  }
});

mongoose.model("RewardType", rewardTypeSchema);
