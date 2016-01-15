app.controller("tester", function($scope, EventService){
 $scope.message = "Working";
});

app.controller("EventsController", function($scope, EventService){
  $scope.message = "Events";
  EventService.getEvents().then(function(events){
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

app.controller("EditEventsController", function($scope, EventService, $routeParams, $location){
  $scope.message = $routeParams.id;
    EventService.getEvent($routeParams.id).then(function(event){
    console.log("this is where we are");
    console.log($routeParams.id);
    console.log("this is my event", event.data);
    $scope.event = event.data;
  });

  $scope.editEvent = function(event){
    EventService.editEvent(event).then(function(){
      $location.path('/events');
    });
  };

  $scope.deleteEvent = function(event){
    console.log("what's being passed to delete function", event._id);
    EventService.deleteEvent(event._id).then(function(){
      $location.path('/events');
    });
  };

});