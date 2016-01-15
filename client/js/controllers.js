app.controller("tester", function($scope, EventService){
 $scope.message = "Working";
});

app.controller("EventsController", function($scope, EventService){
  $scope.message = "Events";
  EventService.getEvents().then(function(){
    $scope.events = events.data;
  }).catch(function(err){
    $scope.errors = err;
  });
});

app.controller("NewEventsController", function($scope, EventService, $location){
 $scope.message = "New";
 $scope.addEvent = function(event){
  EventService.addEvent(event).then(function(){
    $location.path('/events');
  });
 };
});

app.controller("EditEventsController", function($scope, EventService){
  $scope.message = "Edit";
  EventService.getEvent(event).then(function(){
    $scope.event = event.data;
  });

  $scope.editEvent = function(event){
    EventService.editEvent(event).then(function(){
      $location.path('/events');
    });
  };

  $scope.deleteEvent = function(event){
    EventService.deleteEvent(event._id).then(function(){
      $location.path('/events');
    });
  };

});