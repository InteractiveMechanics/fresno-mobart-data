mobart.controller('AllGradesController', function($scope, $modal, $http, $location){
    $http
        .get('/data/api/grades')
        .success(function(response) {
            $scope.grades = response;
            
    });

    $scope.currentUserId = 1;
    $scope.total = function (val1, val2, val3, val4) {
        return parseInt(val1) + parseInt(val2) + parseInt(val3) + parseInt(val4);
    };

    $scope.editModal = function (_student) {
        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'js/views/modals/edit-modal.html',
            controller: 'EditModalController',
            size: 'lg',
            resolve: {
                db: function () {
                    return 'grades';
                },
                record: function () {
                    return _student;
                }
            }
        });
    }
    $scope.deleteModal = function (_student) {
        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'js/views/modals/delete-modal.html',
            controller: 'DeleteModalController',
            size: 'sm',
            resolve: {
                db: function () {
                    return 'grades';
                },
                record: function () {
                    return _student;
                }
            }
        });
    }
});