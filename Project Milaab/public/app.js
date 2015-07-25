'use strict';


angular.module('myApp', [
  'myApp.controllers','myApp.services','ngRoute'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
	when("/login", {templateUrl: "partials/login.html", controller: "loginUser"}).
	when("/register", {templateUrl: "partials/register.html", controller: "registerUser"}).
	when("/blog", {templateUrl: "partials/blog.html", controller: "blogController"}).
	when("/logout", {templateUrl: "partials/logout.html", controller: "LogoutController"}).
	when("/writePost", {templateUrl: "partials/writePost.html", controller: "postingController"}).
	when("/blog/:id", {templateUrl: "partials/post.html", controller: "postController"}).

	otherwise({redirectTo: '/blog'});
}]);