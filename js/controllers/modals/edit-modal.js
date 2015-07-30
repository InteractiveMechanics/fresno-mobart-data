mobart.controller('EditModalController', function($scope, $http, $route, $rootScope, $modalInstance, Upload, db, record){
    $scope.record = record;
    $scope.options = ['1','2','3','4'];

    $scope.save = function (record) {
        var promise = $http.put($rootScope.baseUrl + '/api/' + db + '/' + record.id, record);
        promise.success(function(data, status, headers, config){
            if (status == 200){
		        console.log("Record updated.");
                $modalInstance.close();
                $route.reload();
            } else {
				console.log("Unable to update the record.");
            }
        });
    }
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    }

    $scope.uploadArtwork = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                Upload.upload({
                    url: $rootScope.baseUrl + '/api/upload.php',
                    file: file
                }).success(function (data, status, headers, config) {
                    var fileData  = {
                       'lastModified'     : file.lastModified,
                       'lastModifiedDate' : file.lastModifiedDate,
                       'name'             : data,
                       'size'             : file.size,
                       'mimetype'         : file.type
                    };

                    var promise = $http.post($rootScope.baseUrl + '/api/files', fileData);
                    promise.success(function(data, status, headers, config){
                        if (status == 200){
            		        console.log("File added to database.");
                            record.artworkid = data;
                        } else {
            				console.log("Unable to add file to database.");
                        }
                    });
                });
            }
        }
    };
    $scope.uploadWritingSample = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                Upload.upload({
                    url: $rootScope.baseUrl + '/api/upload.php',
                    file: file
                }).success(function (data, status, headers, config) {
                    var fileData  = {
                       'lastModified'     : file.lastModified,
                       'lastModifiedDate' : file.lastModifiedDate,
                       'name'             : data,
                       'size'             : file.size,
                       'mimetype'         : file.type
                    };

                    var promise = $http.post($rootScope.baseUrl + '/api/files', fileData);
                    promise.success(function(data, status, headers, config){
                        if (status == 200){
            		        console.log("File added to database.");
                            record.writingid = data;
                        } else {
            				console.log("Unable to add file to database.");
                        }
                    });
                });
            }
        }
    };
});