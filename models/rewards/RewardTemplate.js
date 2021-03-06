const mongoose = require("mongoose");
const { Schema } = mongoose;

const rewardTemplateSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    _rewardType: {type: Schema.Types.ObjectId, ref: 'RewardType'},
    imageURL:{
        type: String
    },
    pointValue: {
        type: Number
    },
    _issuer: {type: Schema.Types.ObjectId, ref: 'issuer'},
    schema_version: {type: String, default: 'v2'}
});

mongoose.model("RewardTemplate", rewardTemplateSchema);
