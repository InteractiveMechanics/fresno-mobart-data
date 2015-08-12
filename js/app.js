var mobart = angular.module('mobart', ['ngRoute', 'ngSanitize', 'appControllers', 'ngFileUpload', 'ui.bootstrap', 'ngCsv']);
var appControllers = angular.module('appControllers', []);

mobart.run(function($rootScope) {
    $rootScope.uid = 0;
    $rootScope.baseUrl = '/mobart/data';
});
mobart.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'js/views/grades/all-grades.html',
            controller: 'AllGradesController'
        })
        .when('/classes', {
            templateUrl: 'js/views/classes/all-classes.html',
            controller: 'AllClassesController'
        })
        .when('/classes/add', {
            templateUrl: 'js/views/classes/class-details.html',
            controller: 'AddClassController'
        })
        .when('/classes/edit/:id', {
            templateUrl: 'js/views/classes/class-details.html',
            controller: 'EditClassController'
        })
        .when('/projects', {
            templateUrl: 'js/views/projects/all-projects.html',
            controller: 'AllProjectsController'
        })
        .when('/projects/add', {
            templateUrl: 'js/views/projects/project-details.html',
            controller: 'AddProjectController'
        })
        .when('/projects/edit/:id', {
            templateUrl: 'js/views/projects/project-details.html',
            controller: 'EditProjectController'
        })
        .otherwise({
            redirectTo: '/'
        });
    $locationProvider.html5Mode(true);
}]);