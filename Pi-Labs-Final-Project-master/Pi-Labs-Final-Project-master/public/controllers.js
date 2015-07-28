var app=angular.module('myApp.controllers', []);

app.controller('registerUser', function($scope,ergastAPIservice,$location,$rootScope) {
$rootScope.location = $location.path();  
    $scope.username='';
    $scope.email='';
    $scope.password='';
    
    $scope.register = function () {
        var abc={username:$scope.username,email:$scope.email,password:$scope.password}
        $scope.user='';
    $scope.email='';
    $scope.password='';
    console.log(abc);
        ergastAPIservice.registerUser(abc);
        $location.path("/login");


    }

});
app.controller("loginUser",function($scope,ergastAPIservice,$routeParams,$location,$rootScope)
{
  $rootScope.location = $location.path(); 
  $scope.login=function()
    {
        var abc={username:$scope.username,password:$scope.password};
        console.log("loggin in ka object",abc);
        ergastAPIservice.login(abc).success(function(res){
          console.log(res);
            if(res.error)
            {
              $location.path("/login");
            }
            else
            {
              $rootScope.loggedIn=true;
              $location.path("/home");
            }
        });

    }
});