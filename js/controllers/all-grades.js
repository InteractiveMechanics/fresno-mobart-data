mobart.controller('AllGradesController', function($scope, $http, $location){
    $http
        .get('/data/api/grades')
        .success(function(response) {
            $scope.grades = response;
            
    });

    $scope.total = function (val1, val2, val3, val4) {
        return parseInt(val1) + parseInt(val2) + parseInt(val3) + parseInt(val4);
    };
});