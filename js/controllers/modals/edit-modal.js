mobart.controller('EditModalController', function($scope, $http, $route, $rootScope, $modalInstance, db, record){
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
});