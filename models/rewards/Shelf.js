const mongoose = require("mongoose");
const { Schema } = mongoose;
const rewardSchema = require("./Reward");


const shelfSchema = new Schema({
    name: { type: String, required: true },
    pointsLower:  Number,
    pointsHigher: Number,
    rewardItems: [rewardSchema],
    totalRewardPoints: Number,
    totalRewardValue: Number,
    totalRewards: Number,
    imgURL: {type: String},
    warningLevel: Number
});

mongoose.model("Shelf", shelfSchema);