const mongoose = require("mongoose");
const { Schema } = mongoose;
const LineItemSchema = require('./LineItem');

const orderSchema = new Schema({
    finStatus: {type: String, enum: ['paid', 'unpaid']},
    fulfillStatus: {type: String, enum: ['fulfilled', 'unfulfilled']},
    _learningCentreId: {type: Schema.Types.ObjectId, ref: 'learningcentres'},
    learningCentreName: String,
    lineItems: [LineItemSchema],
    dateReceived: Date,
    dateUpdated: Date,
    dateFulfilled: Date
});

mongoose.model("orders", orderSchema);
