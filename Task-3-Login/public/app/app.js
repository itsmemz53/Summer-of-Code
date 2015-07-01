'use strict';


angular.module('F1FeederApp', [
  'F1FeederApp.controllers','F1FeederApp.services','ngRoute'
]
).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.
 when("/drivers", {templateUrl: "partials/list.html", controller: "driversController"}).
 when("/drivers/:id", {templateUrl: "partials/item.html", controller: "driverController"}).
 otherwise({redirectTo: '/drivers'});
}]);