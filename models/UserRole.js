const mongoose = require('mongoose');
const {Schema} = mongoose;


const userRoleSchema = new Schema({
 name: String
});

module.exports = userRoleSchema;