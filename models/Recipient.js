const mongoose = require('mongoose');
const {Schema} = mongoose;


const recipientSchema = new Schema({
    email: String,
    responded: {type:Boolean, default:false}
});

//exporting because it will be used inside survey so no need to register with Mongoose.

module.exports = recipientSchema;