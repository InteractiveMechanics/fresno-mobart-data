mobart.controller('AllGradesController', function($scope, $modal, $http, $location){
    $http
        .get('/data/api/grades')
        .success(function(response) {
            $scope.grades = response;
            
    });

    $scope.total = function (val1, val2, val3, val4) {
        return parseInt(val1) + parseInt(val2) + parseInt(val3) + parseInt(val4);
    };
    $scope.editModal = function () {
        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'js/views/modals/edit-modal.html',
            controller: 'EditModalController',
            size: 'lg',
            resolve: {}
        });
    }
    $scope.deleteModal = function () {
        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'js/views/modals/delete-modal.html',
            controller: 'DeleteModalController',
            size: 'sm',
            resolve: {}
        });
    }
});