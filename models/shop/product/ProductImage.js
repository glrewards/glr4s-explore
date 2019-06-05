const mongoose = require("mongoose");
const { Schema } = mongoose;


const productImageSchema = new Schema({
    shopifyId: String,
    imageAltText: String
});

mongoose.model("productImages", productImageSchema);
