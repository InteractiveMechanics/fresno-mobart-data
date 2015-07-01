var mobart = angular.module('mobart', ['ngRoute', 'appControllers', 'ngFileUpload']);
var appControllers = angular.module('appControllers', []);

mobart.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'views/all-students.html',
            controller: 'AllStudentsController'
        })
        .otherwise({
            redirectTo: '/'
        });
    $locationProvider.html5Mode(true);
}]);