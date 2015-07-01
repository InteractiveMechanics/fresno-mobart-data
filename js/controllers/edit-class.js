mobart.controller('AllClassesController', function($scope, $http, $location){
    $http
        .get('/data/api/classes')
        .success(function(response) {
            $scope.classes = response;
    });
});