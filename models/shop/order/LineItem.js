const mongoose = require('mongoose');
const {Schema} = mongoose;


const lineItemSchema = new Schema({
    productId: String,
    productName: String,
    variantId: String,
    quantity: Number,
    glrpoints: Number,
});

//exporting because it will be used inside survey so no need to register with Mongoose.

module.exports = lineItemSchema;
