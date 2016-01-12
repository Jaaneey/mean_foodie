var request = require('request'),
express = require('express'),
router = express.Router(),
db = require('../models');


router.get('/meetup', function(req,res){
  // console.log(process.env.MEETUP_KEY);
  // console.log('https://api.meetup.com/2/open_events.json?category=10&zip=94101&time=,1w&key='+ process.env.MEETUP_KEY);
  request('https://api.meetup.com/2/open_events.json?category=10&zip=94101&time=,1w&key='+ process.env.MEETUP_KEY, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var response = JSON.parse(body);
    // console.log(response.results[0]);
    var eventArray = response.results.map(function(el){
        var anEvent = {};
        anEvent.name = el.name;
        anEvent.description = el.description;
        anEvent.start = el.time;
        anEvent.end = el.time + el.duration;
        if (el.venue){
          anEvent.venue = el.venue.name || null;
          anEvent.city = el.venue.city|| null;
          anEvent.address = el.venue.address_1 || null;
        }
        return  anEvent;
    });
    console.log(eventArray[0]);
  }
  });
});


router.get('/eventbrite', function(req,res){
  request('https://www.eventbriteapi.com/v3/events/search/?categories=110&venue.city=san-francisco&token='+ process.env.EVENTBRITE_KEY, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body); // Testing
  }
  });
});

//GRAB VENUE FOR EVENTBRITE 
//https://www.eventbriteapi.com/v3/venues/12155401/?token=




module.exports = router;






