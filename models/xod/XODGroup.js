const mongoose = require("mongoose");
const { Schema } = mongoose;


const XODGroupSchema = new Schema({

  Id: {type: String, required: true},
  XID: {type: String, required: true},
  ExternalId: {type: String, required: false},
  IdaasId: {type: String, required: false},
  Type: {type: String, required: false},
  Code: {type: String, required: false},
  Name: {type: String, required: false},
  PrimaryStaffId: {type: String, required: false},
  Staff: {type: String, required: false},
  NumStudents: {type: Number, required: false},
  RowHash: {type: String, required: false},
  LastUpdated: {type: Date, required: false},
  StudentXIDs: {type: String, required: false},
  StaffXIDs: {type: String, required: false},
  StudentIds: {type: String, required: false},
  StaffIds: {type: String, required: false},
  SubjectLocalId: {type: String, required: false},
  SubjectCode: {type: String, required: false},
  SubjectName: {type: String, required: false}

});

mongoose.model("xodgroups", XODGroupSchema);
