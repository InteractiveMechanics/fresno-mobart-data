mobart.controller('AllStudentsController', function($scope, $http, $location){
    $http
        .get('/data/api/class')
        .success(function(response) {
            $scope.students = response;
    });
});