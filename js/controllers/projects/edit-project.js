mobart.controller('EditProjectController', function($scope, $http, $location){
    $http
        .get('/data/api/projects/' + $routeParams.id)
        .success(function(response) {
            $scope.projectInfo = response;
    });;
});