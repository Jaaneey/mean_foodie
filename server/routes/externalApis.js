var request = require('request'),
express = require('express'),
router = express.Router(),
db = require('../models');


router.get('/meetup', function(req,res){
  // console.log(process.env.MEETUP_KEY);
  // console.log('https://api.meetup.com/2/open_events.json?category=10&zip=94101&time=,1w&key='+ process.env.MEETUP_KEY);
  request('https://api.meetup.com/2/open_events.json?category=10&zip=94101&time=,1w&key='+ process.env.MEETUP_KEY, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var responseM = JSON.parse(body);
    console.log(responseM.results[0]);
    var eventArrayM = responseM.results.map(function(el){
        var anEvent = {};
        anEvent.name = el.name;
        anEvent.url = el.event_url;
        anEvent.description = el.description;
        anEvent.date = new Date(el.time).toDateString();
        anEvent.start = el.time;
        anEvent.end = el.time + el.duration;
        if (el.venue){
          anEvent.venue = el.venue.name || null;
          anEvent.city = el.venue.city|| null;
          anEvent.address = el.venue.address_1 || null;
        }
        return  anEvent;
    });
    console.log(eventArrayM[0]);
  }
  });
});


router.get('/eventbrite', function(req,res){
  request('https://www.eventbriteapi.com/v3/events/search/?categories=110&venue.city=san-francisco&token='+ process.env.EVENTBRITE_KEY, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // console.log(body);  Testing
      var responseE = JSON.parse(body);
      console.log(responseE.events[0]);
      var eventArrayE = responseE.events.map(function(el){
          var anEvent = {};
          anEvent.name = el.name.text;
          anEvent.url = el.vanity_url;
          anEvent.description = el.description.text;
          //NEED DATE
          anEvent.start = el.start.local;
          anEvent.end = el.end.local;
          
          if (el.venue_id){
            request('https://www.eventbriteapi.com/v3/venues/12155401/?token='+ process.env.EVENTBRITE_VENUE, function (error, response, body) {
              if (!error && response.statusCode == 200) {
                console.log(body);
              }
          });
            
          }
          return  anEvent;
      });
    }
  });
});

//GRAB VENUE FOR EVENTBRITE 
//https://www.eventbriteapi.com/v3/venues/12155401/?token=




module.exports = router;






