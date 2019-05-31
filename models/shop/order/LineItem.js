const mongoose = require('mongoose');
const {Schema} = mongoose;


const lineItemSchema = new Schema({
    productId: String,
    productTitle: String,
    variantId: String,
    quantity: Number,
    glrpoints: Number,
    _student: {type: Schema.Types.ObjectId, ref: 'students'}
});

//exporting because it will be used inside survey so no need to register with Mongoose.

module.exports = lineItemSchema;
