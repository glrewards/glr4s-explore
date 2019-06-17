const mongoose = require("mongoose");
const { Schema } = mongoose;


const XODAchievementSchema = new Schema({

  Id: {type: String, required: true},
  ConductId: {type: String, required: true},
  AchievementType: {type: String, required: true},
  Date: {type: Date, required: true},
  Activity: {type: String, required: false},
  RecordedBy: {type: String, required: false},
  RecordedOn: {type: Date, required: false},
  Description: {type: String, required: false},
  Subject: {type: String, required: false},
  Category: {type: String, required: false},
  StudentIds: {type: String, required: false},
  StaffIds: {type: String, required: false},
  LastUpdated: {type: Date, required: false},
  RowHash: {type: String, required: false}


});


mongoose.model("xodachievements", XODAchievementSchema);
