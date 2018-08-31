const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const peopleSchema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  address: {type: String},
  city: {type: String},
  zipCode: {type: Number},
  state: {type: String},
  phoneNumber: {type: Number}
})

module.exports = mongoose.model('peopleSchema', peopleSchema);