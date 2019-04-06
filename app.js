var app = angular.module('myApp', ['ngRoute']).config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'login.htm',
        controller: 'loginController'
      })
      .when('/road', {
        templateUrl: 'road.htm', 
        controller: 'loginController'
      })
      .when('/project', {
        templateUrl: 'project.htm',
      })
      ;
  });
  app.controller('loginController', function ($scope, $location) {
    $scope.submit = function () {
      if ($scope.username === undefined) {
        console.log('Username is empty');
        return;
      }
      if ($scope.password === undefined) {
        console.log('Password is empty');
        return;
      }
      console.log($scope.username);
      console.log($scope.password);
      $location.path('/road');
    };
  });
  app.controller('roadController', function ($scope, $location) {
  });