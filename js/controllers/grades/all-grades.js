mobart.controller('AllGradesController', function($scope, $modal, $http, $location, $rootScope){
    $http
        .get($rootScope.baseUrl + '/api/grades')
        .success(function(response) {
            $scope.grades = response;
    });
    $http
        .get($rootScope.baseUrl + '/api/teachers')
        .success(function(response) {
            $scope.teachers = response;
    });

    $scope.getNameFromTid = function (id) {
        var str = '';
        angular.forEach($scope.teachers, function(value, key) {
            if (id == value.tid) {
                str = value.firstname + ' ' + value.lastname;
            }
        });
        return str;
    }

    $scope.uid = $rootScope.uid;
    $scope.sortClasstype = '';
    $scope.sortUsers = '';
    $scope.sortType = 'cid';
    $scope.sortReverse = false;

    $scope.total = function (val1, val2, val3, val4) {
        return parseInt(val1) + parseInt(val2) + parseInt(val3);
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

    $scope.getArray = $scope.grades;
    $scope.getHeader = function () {
        return ["ID", "ClassID", "ClassName", "classType", "TeacherID", "StudentFirst", "StudentLast", "Incomplete?", "Grade1", "Grade2", "Grade3", "Grade4"]
    };
});