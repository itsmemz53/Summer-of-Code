angular.module('myApp.services', []).
  factory('ergastAPIservice', function($http) {

    var ergastAPI = {};

       ergastAPI.registerUser=function(data)
    {
          var req = {
 method: 'POST',
 url: '/register',
 data: data
};
$http(req);

    }
    ergastAPI.login=function(abc)
    {
              var req = {
 method: 'POST',
 url: '/login',
 data: abc
};
return $http(req); 
    }
     return ergastAPI;
  });