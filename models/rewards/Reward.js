const mongoose = require("mongoose");
const { Schema } = mongoose;


const rewardSchema = new Schema({
  name: { type: String, required: true },
  _type: { type: Schema.Types.ObjectId, ref: "RewardType" },
  _shopifyProduct: { type: Schema.Types.ObjectId, ref: "shopifyproducts" },
  _issuer: { type: Schema.Types.ObjectId, ref: "issuer" },
  count: {type: Number, required: true},
  shopifyProductId: {type: Number},
  schema_version: {type: String, default: 'v2'}
});

mongoose.model("Reward", rewardSchema);
