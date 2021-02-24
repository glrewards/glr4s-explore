const mongoose = require('mongoose');
const {Schema} = mongoose;


const userRoleSchema = new Schema({
 "name": String,
 "schema_version": {type: String, default: 'v2'}
});

module.exports = userRoleSchema;
