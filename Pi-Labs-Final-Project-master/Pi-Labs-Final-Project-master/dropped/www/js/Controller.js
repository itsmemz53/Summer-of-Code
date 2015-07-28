var app = angular.module('dropped', ['ionic','ngRoute']);
app.controller('getBytesProductsSamsung', ['$scope', 'myService', function ($scope, myService) {
    console.log(myService);
    $scope.products = [];
    myService.getBytesSamsung().success(function (res) {

        console.log(res);
        $scope.products = res;
        console.log($scope.products);
    });

}]).controller('getDetails', ['$scope', 'myService','$routeParams','$stateParams', function ( $scope, myService,$routeParams ,$stateParams) {
      $scope.id=$stateParams.id;
    console.log($stateParams);
    $scope.products;
    myService.getBytesSamsungWithId($scope.id).success(function (res) {

        //console.log(res);
        $scope.products = res;
        console.log($scope.products);
    });

}])
        .factory('myService', function ($http) {

            var ergastAPI = {};


            ergastAPI.getBytesSamsung = function () {
                return getProducsServer("/getBytesSamsung");
            }
         ergastAPI.getBytesSamsungWithId = function(id) {
            //console.log("yeh id hai!",id);
            return $http({
                method: 'GET',
                url: '/getBytesSamsung/'+id
            });
        }


            function getProducsServer(URL) {
                return $http({
                    method: 'GET',
                    url: URL
                });
            }


            return ergastAPI;
        }).config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider.state('home', {
                url: '/home',
                templateUrl: '/partials/home.html',
                controller: 'getBytesProductsSamsung'
            });
            $stateProvider.state('details', {
                url: '/details/:id',
                templateUrl: '/partials/Single-Product.html',
                controller: 'getDetails'
            });
            $urlRouterProvider.otherwise('home');
        })
