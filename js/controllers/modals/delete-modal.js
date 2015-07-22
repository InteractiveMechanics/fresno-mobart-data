mobart.controller('DeleteModalController', function($scope, $http, $route, $modalInstance, $rootScope, db, record){
    $scope.record = record;

    $scope.delete = function (id) {
        var promise = $http.delete($rootScope.baseUrl + '/api/' + db + '/' + id);
        promise.success(function(data, status, headers, config){
            if (status == 200){
		        console.log("Record deleted.");
                $modalInstance.close();
                $route.reload();
            } else {
				console.log("Unable to delete the record.");
            }
        });
    }
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    }
});