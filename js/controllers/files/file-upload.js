mobart.controller('FileUploadController', function($scope, $http, Upload, $timeout, $rootScope){
    $scope.upload = function (files) {
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
                       'name'             : file.name,
                       'size'             : file.size,
                       'type'             : file.type
                    };

                    var promise = $http.post($rootScope.baseUrl + '/api/files', fileData);
                    promise.success(function(data, status, headers, config){
                        if (status == 200){
            		        console.log("File added to database.");
                        } else {
            				console.log("Unable to add file to database.");
                        }
                    });
                });
            }
        }
    };
});