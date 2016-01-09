var app = angular.module('foodieApp', ['ngRoute']);

app.config(function($routeProvider, $locationProvider){

  $routeProvider
    // .when('/',{
    //   template: "<p>Test</p>",
    //   controller: "EventsController"
    // })
    .when('/events',{
      templateUrl: "templates/events/index.html",
      controller: "EventsController"
    })
    .when('/events/new',{
      templateUrl: "templates/events/new.html",
      controller: "NewEventsController"
    })
    .when('/events/:id/edit',{
      templateUrl: "templates/events/edit.html",
      controller: "EditEventsController"
    })
    .otherwise({redirectTo: '/events'});




  // get rid of #
  $locationProvider.html5Mode(true);
});