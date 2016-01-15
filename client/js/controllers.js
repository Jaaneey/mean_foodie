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

app.controller("NewEventsController", function($scope, EventService){
 $scope.message = "New";
});

app.controller("EditEventsController", function($scope, EventService){
$scope.message = "Edit";
});