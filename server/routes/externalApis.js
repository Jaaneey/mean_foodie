var request = require('request'),
express = require('express'),
router = express.Router(),
db = require('../models');
require("locus");

router.get('/meetup', function(req,res){
  // console.log(process.env.MEETUP_KEY);
  //console.log('https://api.meetup.com/2/open_events.json?category=10&zip=94101&time=,1w&key='+ process.env.MEETUP_KEY);
  request('https://api.meetup.com/2/open_events.json?category=10&zip=94101&time=,1w&key='+ process.env.MEETUP_KEY, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var responseM = JSON.parse(body);
    // console.log(responseM.results[0]);
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

// EVENTBRITE //////

router.get('/eventbrite', function(req,res){
  console.log("wat???");
  request.get("https://www.eventbriteapi.com/v3/events/search/?categories=110&venue.city=san-francisco"+"&start_date.range_start=2016-01-13T02%3A11%3A30Z&start_date.range_end=2016-01-14T02%3A11%3A30Z"+"&token="+ process.env.EVENTBRITE_KEY, function (error, response, body) {
    // eval(locus);
    // console.log(body);
    // console.log("errors?", error);
    // console.log("finished first one");
    if (!error && response.statusCode == 200) {
      var responseE = JSON.parse(body);
      // console.log(responseE.events[0]);
      // var dummy= 0;
      //****MAP CREATING NEW EVENT ARRAY
      eventArrayE = responseE.events.map(function(el, idx){
        var anEvent = {};
          anEvent.name = el.name.text;
          anEvent.url = el.vanity_url;
          anEvent.description = el.description.text;
          //NEED DATE
          anEvent.start = el.start.local;
          anEvent.end = el.end.local;
          anEvent.venue_id = el.venue_id;

          //GRAB VENUE FOR EVENTBRITE 
        
        // console.log('before venue call',dummy);
        if (el.venue_id){
            // dummy ++;
            // console.log('getting into the loop');
            // console.log('request endpoint:', 'https://www.eventbriteapi.com/v3/venues/'+el.venue_id+'/?token='+ process.env.EVENTBRITE_VENUE);
            // console.log(dummy);
            request('https://www.eventbriteapi.com/v3/venues/el.venue_id/?token='+ process.env.EVENTBRITE_VENUE, function (error, response, body) {
                // console.log("making the call");
                if (!error && response.statusCode == 200) {
                  console.log("*****EVENT", anEvent);
                  var responseV = JSON.parse(body);
                  // console.log('venue info', responseV);
                
                  anEvent.venue = responseV.name;
                  anEvent.city = responseV.address.city;
                  anEvent.address = responseV.address.address_1;
                  // console.log('event with  new thigs', anEvent);
                  return anEvent;
              } else {
                console.log('venue:'+ el.venue_id, error);
              }
            });
          } else { return anEvent;}
          
          
      }); //**** END OF MAP ITERATOR
      console.log(eventArrayE);
      res.send(eventArrayE);
    } 
    else {
        console.log('first call', error);
      }
  }); // END API CALL
}); //END ROUTE


//https://www.eventbriteapi.com/v3/venues/12155401/?token=




module.exports = router;






