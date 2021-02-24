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
  },
  schema_version: {type: String, default: 'v2'}
});

mongoose.model("RewardType", rewardTypeSchema);
