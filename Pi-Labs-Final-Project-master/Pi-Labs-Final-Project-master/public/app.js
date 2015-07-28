'use strict';


angular.module('myApp', [
  'myApp.controllers','myApp.services','ngRoute'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
	when("/login", {templateUrl: "partials/login.html", controller: "loginUser"}).
	when("/register", {templateUrl: "partials/register.html", controller: "registerUser"}).
	//when("/blog", {templateUrl: "partials/blog.html", controller: "blogController"}).
	otherwise({redirectTo: '/home'});
}]);