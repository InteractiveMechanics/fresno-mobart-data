mobart.controller('AllGradesController', function($scope, $modal, $http, $location, $rootScope, CSV){
    $http
        .get($rootScope.baseUrl + '/api/grades')
        .success(function(response) {
            $scope.grades = response;
    });
    $http
        .get($rootScope.baseUrl + '/api/export')
        .success(function(response) {
            $scope.exportFilterRecords = response;
            $scope.exportCheckedRecords = response;
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
    }

    $scope.currentPage = 1;
    $scope.uid = String($rootScope.uid);
    $scope.sortClasstype = '';
    $scope.sortUsers = String($rootScope.uid);
    $scope.sortType = 'cid';
    $scope.sortReverse = false;
    $scope.checkedGid = [];


    $scope.toggleSelection = function(gid) {
        var idx = $scope.checkedGid.indexOf(gid);
        if (idx > -1) {
            $scope.checkedGid.splice(idx, 1);
        } else {
            $scope.checkedGid.push(gid);
        }
        $scope.getCheckedExportRecords();
    }
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
    $scope.getFilteredExportRecords = function () {
        var query = '?';
        if ($scope.search) {
            query += '&name=' + $scope.search;
        }
        if ($scope.sortTeachers) {
            query += '&tid=' + $scope.sortTeachers;
        }
        if ($scope.sortProjects) {
            query += '&pid=' + $scope.sortProjects;
        }

        $http
            .get($rootScope.baseUrl + '/api/export' + query)
            .success(function(response) {
                $scope.exportFilterRecords = response;
        });
    }
    $scope.getCheckedExportRecords = function () {
        var query = '?';
        if ($scope.checkedGid) {
            query += '&gid=';
            angular.forEach($scope.checkedGid, function(value, key) {
                query += value + ',';
            });
            query = query.slice(0, -1);
        }

        $http
            .get($rootScope.baseUrl + '/api/export' + query)
            .success(function(response) {
                $scope.exportCheckedRecords = response;
        });
    }

    $scope.downloadFilterFiles = function () {
        var promise = $http.post($rootScope.baseUrl + '/api/zipper.php', $scope.exportFilterRecords);
    }
    $scope.downloadCheckedFiles = function () {
        var promise = $http.post($rootScope.baseUrl + '/api/zipper.php', $scope.exportCheckedRecords);
        promise.success(function(response){
            var isFirefox = typeof InstallTrigger !== 'undefined';
            var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
            var isIE = /*@cc_on!@*/false || !!document.documentMode;
            var isEdge = !isIE && !!window.StyleMedia;
            var isChrome = !!window.chrome && !!window.chrome.webstore;
            var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
            var isBlink = (isChrome || isOpera) && !!window.CSS;

            if(isFirefox || isIE || isChrome){
                if(isChrome){
                    var url = window.URL || window.webkitURL;
                    var fileURL = $rootScope.baseUrl + '/api/archive.zip';
                    var downloadLink = angular.element('<a></a>');//create a new  <a> tag element
                    downloadLink.attr('href',fileURL);
                    downloadLink.attr('download','archive.zip');
                    downloadLink.attr('target','_self');
                    downloadLink[0].click();//call click function
                    url.revokeObjectURL(fileURL);//revoke the object from URL
                }
                if(isIE){
                    window.navigator.msSaveOrOpenBlob($rootScope.baseUrl + '/api/archive.zip','archive.zip'); 
                }
                if(isFirefox){
                    var url = window.URL || window.webkitURL;
                    var fileURL = $rootScope.baseUrl + '/api/archive.zip';
                    var a=elem[0];//recover the <a> tag from directive
                    a.href=fileURL;
                    a.download='archive.zip';
                    a.target='_self';
                    a.click();//we call click function
                }


            }
        });
    }

    $scope.getHeader = function () {
        return ["Grade ID", "Class Name", "Class Type", "Student First Name", "Student Last Name", "Incomplete?", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Total", "Artwork URL", "Writing Sample URL"]
    };
});
