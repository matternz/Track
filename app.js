var app = angular.module('myApp', ['ngRoute', 'ngMaterial'])

var data = undefined
var user = ''

app.config(function ($routeProvider) {
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

app.controller('loginController', function ($scope, $location) {
  $scope.submit = function () {
    if ($scope.username === undefined) {
      console.log('Username is empty')
      alert('Username is empty')
      return
    }
    if ($scope.password === undefined) {
      console.log('Password is empty')
      alert('Password is empty')
      return
    }

    data = jsonData = requestJsonUsers($scope.username)
    user = $scope.user

    if (validateUser(jsonData, $scope.username, $scope.password)) {
      $location.path('/road')
      return
    }
    console.log('invalid username or password')
    alert('invalid username or password')
  }
})

function requestJsonUsers (username) {
  var request = new XMLHttpRequest()
  request.open(
    'GET',
    'https://track.sim.vuw.ac.nz/api/' + username + '/user_list.json',
    false
  )
  request.send(null)
  return JSON.parse(request.responseText)
}

function validateUser (json, username, password) {
  var success = false
  json.Users.forEach(function (element) {
    if (element.LoginName == username) {
      if (element.Password == password) {
        console.log('success')
        success = true
      }
    }
  })
  return success
}

app.controller('roadController', function ($scope, $location, $mdDialog) {
  roadData = requestJsonRoad()
  $scope.roads = roadData.Roads

  $scope.openRoadForm = function () {
    console.log('open road form')
    $mdDialog.show({
      templateUrl: 'roadDetail.htm',
      controller: 'roadController'
    })
  }

  $scope.closeForm = function () {
    console.log('closeForm')
    $mdDialog.hide()
  }

  $scope.addRoad = function () {
    console.log('add road form')
    $mdDialog.show({
      templateUrl: 'addRoad.htm',
      controller: 'roadController'
    })
  }
})

function requestJsonRoad () {
  var request = new XMLHttpRequest()
  request.open(
    'GET',
    'https://track.sim.vuw.ac.nz/api/' + user + '/road_dir.json',
    false
  )
  request.send(null)
  return JSON.parse(request.responseText)
}

app.controller('projectController', function ($scope, $location, $mdDialog) {
  $scope.openProjectForm = function () {
    console.log('open project form')
    $mdDialog.show({
      templateUrl: 'projectDetail.htm',
      controller: 'projectController'
    })
  }
  $scope.editContractor = function () {
    console.log('open contractor form')
    $mdDialog.show({
      templateUrl: 'Contractor.htm',
      controller: 'projectController'
    })
  }
  $scope.problemLog = function () {
    console.log('open Problem Log')
    $mdDialog.show({
      templateUrl: 'ProblemLog.htm',
      controller: 'projectController'
    })
  }
  $scope.closeForm = function () {
    console.log('closeForm')
    $mdDialog.hide()
  }
  $scope.addProject = function () {
    console.log('add project form')
    $mdDialog.show({
      templateUrl: 'addProject.htm',
      controller: 'projectController'
    })
  }
  projectData = requestJsonProject()
  $scope.projects = projectData.Projects
})

function requestJsonProject () {
  var request = new XMLHttpRequest()
  request.open(
    'GET',
    'https://track.sim.vuw.ac.nz/api/' + user + '/project_dir.json',
    false
  )
  request.send(null)
  return JSON.parse(request.responseText)
}
