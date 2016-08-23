mobart.controller('AllGradesController', function($scope, $modal, $http, $location, $rootScope){
    $http
        .get($rootScope.baseUrl + '/api/grades')
        .success(function(response) {
            $scope.grades = response;
    });
    $http
        .get($rootScope.baseUrl + '/api/export')
        .success(function(response) {
            $scope.exportRecords = response;
    });
    $http
        .get($rootScope.baseUrl + '/api/teachers')
        .success(function(response) {
            response.splice(0, 2);
            response.sort(function(a, b){
                if(a.lastname < b.lastname) return -1;
                if(a.lastname > b.lastname) return 1;
                return 0;
            });
            $scope.teachers = response;
    });
    
    $http
        .get($rootScope.baseUrl + '/api/projects')
        .success(function(response) {
            $scope.projects = response;
	});
	
	$http
        .get($rootScope.baseUrl + '/api/semesters')
        .success(function(response) {
            $scope.semesters = response;
            console.log(response);
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
    
    $scope.getProjectsById = function(id) {
	    
	    var str = '';
        angular.forEach($scope.projects, function(value, key) {
           	if (id == value.id) {
                str = value.name;
            }
        });
        return str;
        
	    /*var response = $scope.projects;
		console.log(response);
        for (var item in response) {
         	if (id == parseInt(response[item])) {
	         	console.log(true);
				return response[item].name
			}
		}
		
		return '';*/
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

    $scope.getArray = $scope.exportRecords;
    $scope.getHeader = function () {
        return ["Grade ID", "Class Name", "Class Type", "Student First Name", "Student Last Name", "Incomplete?", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Artwork URL", "Artwork Filetype", "Writing Sample URL"]
    };
});
