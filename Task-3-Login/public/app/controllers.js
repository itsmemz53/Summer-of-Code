angular.module('F1FeederApp.controllers', []).
controller('driversController', function($scope,ergastAPIservice) {
    $scope.driversList = [];
    $scope.filter="";
   $scope.search = function (driver) {
        var keyword = new RegExp($scope.filter, 'i');
        return !$scope.filter || keyword.test(driver.Driver.givenName) || keyword.test(driver.Driver.familyName);
    };
    ergastAPIservice.getDrivers().success(function(res){
      //alert("loaded");
      $scope.driversList = res;
    });
    //to detect a change of variable inside controller:

$scope.myVar = 1;

   $scope.$watch('myVar', function() {
        });
}).controller('driverController', function($scope,ergastAPIservice,$routeParams) {
    $scope.driversList = [];
    $scope.filter="";
      $scope.id=$routeParams.id;
   $scope.search = function (driver) {
        var keyword = new RegExp($scope.filter, 'i');
        return !$scope.filter || keyword.test(driver.Driver.givenName) || keyword.test(driver.Driver.familyName);
    };
    ergastAPIservice.getDriver($scope.id).success(function(res){
      //alert("loaded");
      $scope.driver= res;
      console.log(res);
    });
    //to detect a change of variable inside controller:

$scope.myVar = 1;

   $scope.$watch('myVar', function() {
      
   });
 
})