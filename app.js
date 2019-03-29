var app = angular.module('login', []);
app.controller('loginController', function ($scope) {
  $scope.submit = function () {
    if($scope.username === undefined){
      console.log('Username is empty');
      return;
    }
    if($scope.password === undefined){
      console.log('Password is empty');
      return;
    }
    console.log($scope.username);
    console.log($scope.password);
  };  
});