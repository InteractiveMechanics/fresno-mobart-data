mobart.controller('AllProjectsController', function($scope, $modal, $http, $location, $rootScope){
    $http
        .get($rootScope.baseUrl + '/api/projects')
        .success(function(response) {
            $scope.projects = response;
    });

    $scope.deleteModal = function (_project) {
        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'js/views/modals/delete-modal.html',
            controller: 'DeleteModalController',
            size: 'sm',
            resolve: {
                db: function () {
                    return 'projects';
                },
                record: function () {
                    return _project;
                }
            }
        });
    }
});