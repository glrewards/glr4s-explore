const mongoose = require("mongoose");
const { Schema } = mongoose;
const rewardSchema = require("./Reward");


const shelfSchema = new Schema({
    name: { type: String, required: true },
    pointsLower: { type: Number, required: true, default: 0 },
    pointsHigher:{ type: Number, required: true, default: 0},
    rewardItems: [rewardSchema],
    totalRewards: Number,
    imgURL: {type: String},
    warningLevel: Number
});

mongoose.model("Shelf", shelfSchema);
