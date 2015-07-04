
angular.module('myApp.services', []).
  factory('ergastAPIservice', function($http) {

    var ergastAPI = {};

       ergastAPI.registerUser=function(data)
    {
          var req = {
 method: 'POST',
 url: '/signup',
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
    ergastAPI.getBlog = function(id) {
      console.log("yeh id hai!",id);
      return $http({
        method: 'GET', 
        url: '/blogs/'+id
      });
    }
    ergastAPI.savePost=function(abc)
    {
      var req={
        method:'POST',
        url:'/newBlog',
        data:abc
      };
      return $http(req);
    }
   
     ergastAPI.getBlogs = function() {
      return $http({
        method: 'GET', 
        url: '/blogs'
      });
    }

    return ergastAPI;
  });