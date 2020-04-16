const mongoose = require("mongoose");
const { Schema } = mongoose;
const shelfSchema = require("./Shelf");


const cabinetSchema = new Schema({
    name: { type: String, required: true },
    _learningCentreId: { type: Schema.Types.ObjectId, ref: "learningCentre" },
    shelves: [shelfSchema],
    lastStockedDate: Date,
    lastUpdatedDate: Date
});

mongoose.model("Cabinet", cabinetSchema);
