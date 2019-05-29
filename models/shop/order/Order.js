const mongoose = require("mongoose");
const { Schema } = mongoose;
const LineItemSchema = require('./LineItem');

const orderSchema = new Schema({
    finStatus: String,
    fulfillStatus: String,
    _school: {type: Schema.Types.ObjectId, ref: 'School'},
    lineItems: [LineItemSchema],
    orderTotal: Number,
    taxTotal: Number,
    totalGLRPoints: Number,
    shopifyOrderId: String,
    shopifyDraftOrderId: String,
    dateReceived: Date,
    dateFullfilled: Date
});

mongoose.model("orders", orderSchema);
