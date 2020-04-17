const mongoose = require('mongoose');
const {Schema} = mongoose;


const lineItemSchema = new Schema({
    _rewardId: {type: Schema.Types.ObjectId, ref: 'Reward'},
    productId: String,
    productTitle: String,
    variantId: String,
    quantity: Number,
    glrpoints: Number,
    username: String,
    memberFirstName: String,
    memberLastName: String,
    img: String,
    _student: {type: Schema.Types.ObjectId, ref: 'students'}
});

//exporting because it will be used inside survey so no need to register with Mongoose.

module.exports = lineItemSchema;
