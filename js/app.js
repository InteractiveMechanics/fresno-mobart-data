var mobart = angular.module('mobart', ['ngRoute', 'appControllers', 'ngFileUpload']);
var appControllers = angular.module('appControllers', []);

mobart.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'views/all-grades.html',
            controller: 'AllGradesController'
        })
        .when('/classes', {
            templateUrl: 'views/all-classes.html',
            controller: 'AllClassesController'
        })
        .when('/classes/add', {
            templateUrl: 'views/class-details.html',
            controller: 'AddClassController'
        })
        .when('/classes/edit', {
            templateUrl: 'views/class-details.html',
            controller: 'EditClassController'
        })
        .when('/projects', {
            templateUrl: 'views/all-projects.html',
            controller: 'AllProjectsController'
        })
        .otherwise({
            redirectTo: '/'
        });
    $locationProvider.html5Mode(true);
}]);