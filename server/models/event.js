var mongoose = require('mongoose');

var eventSchema =  new mongoose.Schema({
  name: String,
  url: String,
  description: String,
  date: String,
  start: String, //UTC TIMESTAMP PLEASE
  end: String,   //UTIC TIMESTAMP PLEASE
  venue: String,
  city: String,
  address: String
});


var Event = mongoose.model('Event', eventSchema);
module.exports = Event;