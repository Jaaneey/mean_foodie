var express = require('express'),
router = express.Router(),
db = require('../models');


// ROUTES

//get all events
router.get('/', function(req,res){
  db.Event.find({}, function(err, events){
    res.status(200).send(events);
  });
});

//post new event

router.post('/', function(req,res){
  db.Event.create(req.body, function(err,event){
    res.status(201).send(event);
  });
});


//FOR EDITING EVENTS
//get single event
router.get('/:id', function(req, res){
  db.Event.findById(req.params.id, function(err, event){
    console.log("server sending event back", event);
    res.status(200).send(event);
  });
});

//put update single event
router.put('/:id', function(req,res){
  db.Event.findByIDAndUpdate(req.params.id, req.body, function(err, event){
    res.status(200).send(event);
  });
});
//delete single event
router.delete('/:id', function(req,res){
  console.log("serverside delete route");
  db.Event.findByIdAndRemove(req.params.id, function(err, event){
    res.status(200).send();
  });
});


module.exports = router;
