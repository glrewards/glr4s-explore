const mongoose = require("mongoose");
const { Schema } = mongoose;

const rewardTemplateSchema = new Schema({
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
    },
    _rewardType: {type: Schema.Types.ObjectId, ref: 'rewardType'},
    imageURL:{
        type: String
    },
    pointValue: {
        type: Number
    },
    _issuer: {type: Schema.Types.ObjectId, ref: 'issuer'},
});

mongoose.model("RewardTypes", rewardTemplateSchema);