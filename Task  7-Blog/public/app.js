'use strict';


angular.module('BlogApp', [
  'BlogApp.controllers','BlogApp.services','ngRoute'
]
).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.
 when("/login", {templateUrl: "partials/login.html", controller: "LoginFormController"}).
 when("/create", {templateUrl: "partials/newForm.html", controller: "RegisterFormController"}).
 when("/blog", {templateUrl: "partials/home.html", controller: "BlogController"}).

 otherwise({redirectTo: '/login'});
}]);