var mongoose = require('mongoose');

var eventSchema =  new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  photoUrl: String
});


var Event = mongoose.model('event', eventSchema);
module.exports = Icecream;