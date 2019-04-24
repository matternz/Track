var app = angular.module('myApp', ['ngRoute', 'ngMaterial'])

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'login.htm',
      controller: 'loginController'
    })
    .when('/road', {
      templateUrl: 'road.htm',
      controller: 'roadController'
    })
    .when('/project', {
      templateUrl: 'project.htm',
      controller: 'projectController'
    })
})

app.controller('loginController', function($scope, $location) {
  $scope.submit = function() {
    if ($scope.username === undefined) {
      console.log('Username is empty')
      return
    }
    if ($scope.password === undefined) {
      console.log('Password is empty')
      return
    }
    console.log($scope.username)
    console.log($scope.password)
    $location.path('/road')
  }
})

app.controller('roadController', function($scope, $location, $mdDialog) {
  $scope.openRoadForm = function() {
    console.log('open road form')
    $mdDialog.show({
      templateUrl: 'roadDetail.htm'
    })
  }
})

app.controller('projectController', function($scope, $location, $mdDialog) {
  $scope.openProjectForm = function() {
    console.log('open project form')
    $mdDialog.show({
      templateUrl: 'projectDetail.htm'
    })
  }
})
