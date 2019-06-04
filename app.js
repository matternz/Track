var app = angular.module('myApp', ['ngRoute', 'ngMaterial'])

var data = undefined
var user = ''
var eProject = undefined
var eRoad = undefined
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
    user = $scope.username
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

  $scope.delete = function (ID) {
    console.log('delete ' + ID)
    var request = new XMLHttpRequest()
    request.open(
      'DELETE',
      'https://track.sim.vuw.ac.nz/api/' +
        user +
        '/delete.road.' +
        ID +
        '.json',
      true
    )
    request.send(null)
  }

  $scope.viewMore = function () {
    $scope.view = true
  }

  $scope.viewLess = function () {
    $scope.view = false
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

  $scope.editRoad = function (ID) {
    console.log('edit road ' + ID)
    var request = new XMLHttpRequest()
    request.open(
      'GET',
      'https://track.sim.vuw.ac.nz/api/' + user + '/road.' + ID + '.json',
      false
    )
    request.send(null)

    $scope.eRoad = JSON.parse(request.responseText)
    eRoad = $scope.eRoad
    console.log($scope.eRoad)
    $mdDialog.show({
      templateUrl: 'editRoad.htm',
      controller: 'roadController'
    })
  }

  $scope.logOut = function () {
    console.log('log out')
    $location.path('/')
  }

  $scope.updateRoad = function () {
    console.log('submitting road')
    var request = new XMLHttpRequest()
    request.open(
      'POST',
      'https://track.sim.vuw.ac.nz/api/' + user + '/update.road.json',
      true
    )
    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    var roadData = {
      ID: $scope.ID,
      Code: $scope.Code,
      Type: $scope.Type,
      Section: $scope.Section,
      Location: $scope.Location,
      GPS: $scope.GPS
    }
    console.log(roadData)
    request.send(JSON.stringify(roadData))
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
  $scope.delete = function (ID) {
    console.log('delete ' + ID.stringify)
    var request = new XMLHttpRequest()
    request.open(
      'DELETE',
      'https://track.sim.vuw.ac.nz/api/' +
        user +
        '/delete.project.' +
        ID +
        '.json',
      true
    )
    request.send(null)
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

  $scope.updateProject = function () {
    console.log('submitting project')
    var request = new XMLHttpRequest()
    request.open(
      'POST',
      'https://track.sim.vuw.ac.nz/api/' + user + '/update.project.json',
      true
    )
    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    var projectData = {
      ID: $scope.ID,
      Road: $scope.Road,
      Status: $scope.Status,
      StartDate: $scope.StartDate,
      EndDate: $scope.EndDate,
      Contrator: $scope.Contrator,
      Problems: [{ Author: $scope.PAuthor, Text: $scope.PText }],
      Comments: [{ Author: $scope.CAuthor, Text: $scope.CText }],
      Works: [
        {
          Type: $scope.WType,
          SubContractors: $scope.SubContrator,
          Status: $scope.Status
        }
      ]
    }
    console.log(projectData)
    request.send(JSON.stringify(projectData))
  }

  $scope.openProject = function (id) {
    console.log('open project')
    var request = new XMLHttpRequest()
    request.open(
      'GET',
      'https://track.sim.vuw.ac.nz/api/' + user + '/update.project.json',
      true
    )
    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')

    project = JSON.parse(request.responseText)
    console.log(project)
    project.Status = 'Open'

    request.open(
      'POST',
      'https://track.sim.vuw.ac.nz/api/' + user + '/update.project.json',
      true
    )
    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    request.send(JSON.stringify(project))
  }

  $scope.closeProject = function (id) {
    console.log('close project')
    var request = new XMLHttpRequest()
    request.open(
      'GET',
      'https://track.sim.vuw.ac.nz/api/' + user + '/update.project.json',
      true
    )
    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')

    project = JSON.parse(request.responseText)
    console.log(project)
    project.Status = 'Closed'

    request.open(
      'POST',
      'https://track.sim.vuw.ac.nz/api/' + user + '/update.project.json',
      true
    )
    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    request.send(JSON.stringify(project))
  }

  $scope.editProject = function (ID) {
    console.log('edit project ' + ID)
    var request = new XMLHttpRequest()
    request.open(
      'GET',
      'https://track.sim.vuw.ac.nz/api/' + user + '/project.' + ID + '.json',
      false
    )
    request.send(null)

    $scope.eProject = JSON.parse(request.responseText)
    eProject = $scope.eProject
    console.log($scope.eProject)
    $mdDialog.show({
      templateUrl: 'editProject.htm',
      scope: $scope,
      preserveScope: true,
      controller: 'projectController'
    })
  }

  $scope.eProject = eProject

  $scope.logOut = function () {
    console.log('log out')
    $location.path('/')
  }

  $scope.viewMore = function () {
    $scope.view = true
  }

  $scope.viewLess = function () {
    $scope.view = false
  }

  projectData = requestJsonProject()
  $scope.projects = projectData.Projects
  console.log(projectData.Projects)
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
