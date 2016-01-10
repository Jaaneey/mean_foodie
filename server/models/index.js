var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/events-db");

mongoose.set("debug", true);

module.exports.Events = require("./event");