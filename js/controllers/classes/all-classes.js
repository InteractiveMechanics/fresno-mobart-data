mobart.controller('AllClassesController', function($scope, $modal, $http, $location, $rootScope){
    $http
        .get($rootScope.baseUrl + '/api/classes')
        .success(function(response) {
            $scope.classes = response;
    });
    
    $scope.sortClasstype = '';

    $scope.deleteModal = function (_class) {
        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'js/views/modals/delete-modal.html',
            controller: 'DeleteModalController',
            size: 'sm',
            resolve: {
                db: function () {
                    return 'classes';
                },
                record: function () {
                    return _class;
                }
            }
        });
    }
});