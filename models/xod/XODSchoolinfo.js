
const mongoose = require("mongoose");
const { Schema } = mongoose;

const XODSchoolInfoSchema = new Schema({

  Id: {type: String, required: true},
  Name: {type: String, required: false},
  Head: {type: String, required: false},
  MainContact: {type: String, required: false},
  Telephone: {type: String, required: false},
  Web: {type: String, required: false},
  Email: {type: String, required: false},
  DeniNo: {type: String, required: false},
  Governance: {type: String, required: false},
  Phase: {type: String, required: false},
  ExamCentre: {type: String, required: false},
  Address: {type: String, required: false},
  EstabId: {type: String, required: false},
  CurrentAcademicYear: {type: String, required: false},
  SchoolLogoUrl: {type: String, required: false},
  SchoolLogoAlternateUrl: {type: String, required: false},
  LastUpdated: {type: Date, required: false},
  RowHash: {type: String, required: false}

});

module.exports = XODSchoolInfoSchema;
