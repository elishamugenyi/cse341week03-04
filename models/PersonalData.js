// models/PersonalData.js
const mongoose = require('mongoose');

//create new object and connect to db collection called personaldata
const personalDataSchema = new mongoose.Schema({
  _id: String,
  name: String,
  price: Number,
  category: String, 
  description:  String,
  quantity: Number,
  inStock:  Boolean, 
},{ collection: 'personaldata' });

//const PersonalData = mongoose.model('PersonalData', personalDataSchema);

module.exports = mongoose.model('PersonalData', personalDataSchema);
