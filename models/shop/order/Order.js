const mongoose = require("mongoose");
const { Schema } = mongoose;
const LineItemSchema = require('./LineItem');

const orderSchema = new Schema({
    finStatus: {type: String, enum: ['paid', 'unpaid']},
    fulfillStatus: {type: String, enum: ['fulfilled', 'unfulfilled']},
    _school: {type: Schema.Types.ObjectId, ref: 'schools'},
    lineItems: [LineItemSchema],
    orderTotal: Number,
    taxTotal: Number,
    shopifyOrderId: String,
    shopifyDraftOrderId: String,
    dateReceived: Date,
    dateFulfilled: Date
});

mongoose.model("orders", orderSchema);
