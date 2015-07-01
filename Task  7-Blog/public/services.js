angular.module('BlogApp.services', []).
  factory('ergastAPIservice', function($http) {

    var ergastAPI = {};

    ergastAPI.LoginForm = function(abc) {

      var req={
        method: 'POST', 
        url: '/login',
        data : abc
     
    };
    $http(req);
    }
    ergastAPI.RegisterForm = function(abc) {

      var req={
        method: 'POST', 
        url: '/create',
        data : abc
     
    };
    $http(req);
    }
    return ergastAPI;
  });