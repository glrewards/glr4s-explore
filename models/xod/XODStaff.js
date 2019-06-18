const mongoose = require("mongoose");
const { Schema } = mongoose;

const XODStaffSchema = new Schema({

  Id : {type: String, required: true},
  XID : {type: String, required: true},
  ExternalId : {type: String, required: true},
  IdaasId : {type: String, required: false},
  Title: {type: String, required: false},
  Suffix: {type: String, required: false},
  StaffCode: {type: String, required: false},
  StaffStatus: {type: String, required: false},
  TeacherCategory: {type: String, required: false},
  Forename : {type: String, required: false},
  Surname : {type: String, required: false},
  DisplayName:{type: String, required: false},
  WorkEmail: {type: String, required: false},
  IdaasEmail:{type: String, required: false},
  WorkPhone: {type: String, required: false},
  Photo: {type: Buffer, required: false},
  Gender: {type: String, required: false},
  MiddleName: {type: String, required: false},
  LegalForename: {type: String, required: false},
  LegalSurname: {type: String, required: false},
  DateOfBirth: {type: Date, required: false},
  PayrollNumber: {type: String, required: false},
  NINumber: {type: String, required: false},
  TeacherNumber: {type: String, required: false},
  EmploymentStart: {type: Date, required: false},
  EmploymentEnd: {type: Date, required: false},
  Roles: {type: String, required: false},
  HomeEmail: {type: String, required: false},
  HomePhone: {type: String, required: false},
  MobilePhone: {type: String, required: false},
  AddressBlock :{type: String, required: false},
  HouseNo : {type: String, required: false},
  HouseName :{type: String, required: false},
  Apartment : {type: String, required: false},
  Street : {type: String, required: false},
  District : {type: String, required: false},
  TownOrCity : {type: String, required: false},
  County : {type: String, required: false},
  PostCode : {type: String, required: false},
  Country : {type: String, required: false},
  IsTeacher: {type: Number, required: false},
  IsSupport: {type: Number, required: false},
  RegGroup: {type: String, required: false},
  LastUpdated: {type: Date, required: false},
  RowHash: {type: String, required: false},
  GroupIdaasIds: {type: String, required: false},
  GroupIds: {type: String, required: false},
  GroupXIDs: {type: String, required: false}

});

module.exports = XODStaffSchema;