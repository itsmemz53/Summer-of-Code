var app=angular.module('BlogApp.controllers', []);
app.controller('LoginFormController', function($scope,ergastAPIservice,$location) {
    $scope.login=function(){
    var abc={username:$scope.username,password:$scope.password};

    ergastAPIservice.LoginForm(abc).success(function(res){
      //alert("loaded");
        $location.path('/blog');
    });
   

  }
    //to detect a change of variable inside controller:
});
app.controller('RegisterFormController',function($scope,ergastAPIservice,$location){
$scope.register=function(){
    $scope.username='';
    $scope.password='';
    $scope.email='';
    var abc={username:$scope.username,password:$scope.password,email:$scope.email};

        $location.path('/login');

  }
});
app.controller('BlogController',function($scope,ergastAPIservice,$location){
$scope.login=function(){
   

  }
});
 
