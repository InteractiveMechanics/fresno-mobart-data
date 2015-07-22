mobart.controller('EditProjectController', function($scope, $http, $location, $rootScope){
    $http
        .get($rootScope.baseUrl + '/api/projects/' + $routeParams.id)
        .success(function(response) {
            $scope.projectInfo = response;
    });;
});