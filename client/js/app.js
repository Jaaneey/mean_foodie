var app = angular.module("foodieApp", ['ngRoute']);

app.config(function($routeProvider, $locationProvider){

  $routeProvider
    .when('/events',{
      templateUrl: "templates/events/index.html",
      controller: "EventsController"
    })
    .when('/todos/new',{
      templateUrl: "templates/events/new.html",
      controller: "NewEventsController"
    })
    .when('/todos/:id/edit',{
      templateUrl: "templates/events/edit.html",
      controller: "EditEventsController"
    })
    .otherwise({redirectTo: '/events'});


  // get rid of #
  $locationProvider.html5Mode(true);
});