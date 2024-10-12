// models/PersonalData.js
const mongoose = require('mongoose');

//create new object and connect to db collection called personaldata
const itemDataSchema = new mongoose.Schema({
  //_id: String,
  name: String,
  price: Number,
  category: String, 
  description:  String,
  quantity: Number,
  inStock:  Boolean, 
},{ collection: 'itemdata' });

//const PersonalData = mongoose.model('PersonalData', personalDataSchema);

module.exports = mongoose.model('ItemData', itemDataSchema);
