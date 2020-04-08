const mongoose = require("mongoose");
const { Schema } = mongoose;
const productSchema = require('../shop/product/Product');

const rewardSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  points: { type: Number, required: true, default: 0 },
  _type: { type: Schema.Types.ObjectId, ref: "rewardType" },
  product: productSchema
});

mongoose.model("Reward", rewardSchema);
