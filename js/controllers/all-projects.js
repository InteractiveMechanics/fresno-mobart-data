mobart.controller('AllProjectsController', function($scope, $http, $location){
    $http
        .get('/data/api/projects')
        .success(function(response) {
            $scope.projects = response;
    });
});