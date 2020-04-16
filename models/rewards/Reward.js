const mongoose = require("mongoose");
const { Schema } = mongoose;


const rewardSchema = new Schema({
  name: String,
  _shopifyProduct: { type: Schema.Types.ObjectId, ref: "shopifyproducts" },
  _issuer: { type: Schema.Types.ObjectId, ref: "issuer" },
  count: {type: Number, required: true},
});

mongoose.model("Reward", rewardSchema);
