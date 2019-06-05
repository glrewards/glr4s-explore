const mongoose = require("mongoose");
const { Schema } = mongoose;


const variantSchema = new Schema({
    shopifyId: String,
    sku: String,
    title: String,
    inventoryQuantity: Number,
    price: Number,
    imageId: String,
    imageSrc: String,
    imageAltText: String
});

mongoose.model("variants", variantSchema);
