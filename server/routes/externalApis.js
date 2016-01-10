var request = require('request'),
express = require('express'),
router = express.Router(),
db = require('../models');


router.get('/', function(req,res){
  request('https://api.meetup.com/2/open_events.json?category=10&zip=94101&time=,1w&key='+ process.env.MEETUPKEY, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body); // Show the HTML for the Google homepage. 
  }
  });
});







module.exports = router;






