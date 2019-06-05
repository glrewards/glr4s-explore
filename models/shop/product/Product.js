const mongoose = require("mongoose");
const { Schema } = mongoose;
const variantSchema = require('./Variant');
const productImageSchema = require("./ProductImage");

const productSchema = new Schema({
    shopifyId: String,
    shopifyProductType: String,
    title: String,
    handle: String,
    glrpoints: Number,
    description: String,
    descriptionHtml: String,
    descriptionPlainSummary: String,
    featuredImage: productImageSchema,
    images: [productImageSchema],
    variants: [variantSchema]
});

mongoose.model("products", productSchema);
