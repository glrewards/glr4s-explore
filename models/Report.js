const mongoose = require("mongoose");
const {Schema} = mongoose;

const reportSchema = new Schema({
    "fileName": {type: String, required: true},
    "fileType": {type:String, required: true},
    "file": {type: Buffer, required: true},
    "schema_version": {type: String, default: 'v2'}
});

mongoose.model("PickingList", reportSchema);
module.exports = reportSchema;

