mobart.controller('AllClassesController', function($scope, $modal, $http, $location){
    $http
        .get('/data/api/classes')
        .success(function(response) {
            $scope.classes = response;
    });

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