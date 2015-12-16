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

    $scope.currentPage = 1;
    $scope.uid = String($rootScope.uid);
    $scope.sortClasstype = '';
    $scope.sortUsers = String($rootScope.uid);
    $scope.sortType = 'cid';
    $scope.sortReverse = false;

    $scope.getThumbnail = function(file) {
        var image;
        if (file){
            var ext = file.split('.').pop();
    
            if (ext == 'jpg' || ext == 'png') {
                image = '/mobart/data/files/' + file;
            }
            else if (ext == 'mov' || ext == 'mp4' || ext == 'webm') {
                image = '/mobart/data/ic_video.png';
            }
            else {
                image = '/mobart/data/no_file.png';
            }
        } else {
            image = '/mobart/data/no_file.png';
        }

        return image;
    };
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