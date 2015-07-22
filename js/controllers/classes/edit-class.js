mobart.controller('EditClassController', function($scope, $rootScope, $routeParams, $http, $location){
    $scope.editable = true;
    $http
        .get('/data/api/classes/' + $routeParams.id + '/students')
        .success(function(response) {
            $scope.students = response;
    });
    $http
        .get('/data/api/projects')
        .success(function(response) {
            $scope.projects = response;
    });
    $http
        .get('/data/api/classes/' + $routeParams.id)
        .success(function(response) {
            $scope.classDetails = response;
    });

    $scope.saveClass = function () {
        var promise = $http.put('/data/api/classes/' + $routeParams.id, $scope.classDetails[0]);
        promise.success(function(data, status, headers, config){
            if (status == 200){
		        console.log("Class updated.");
                $location.path('/classes');
            } else {
				console.log("Unable to update the class.");
            }
        });
    }
    $scope.updateStudent = function (student) {
        var promise = $http.put('/data/api/classes/' + $routeParams.id + '/students/' + student.id, student);
        promise.success(function(data, status, headers, config){
            if (status == 200){
		        console.log("Student updated.");
            } else {
				console.log("Unable to update the student.");
            }
        });
    }
    $scope.addStudent = function () {
        $scope.newStudent.id = $routeParams.id;
        var promise = $http.post('/data/api/classes/' + $routeParams.id + '/students', $scope.newStudent);
        promise.success(function(data, status, headers, config){
            if (status == 200){
		        console.log("Student created.");
                $http
                    .get('/data/api/classes/' + $routeParams.id + '/students')
                    .success(function(response) {
                        $scope.students = response;
                        $scope.newStudent.firstname = '';
                        $scope.newStudent.lastname = '';
                });
            } else {
				console.log("Unable to create the student.");
            }
        });
        promise.error(function(data, status, headers, config){
            console.log("Unable to create the student.");
        });
    }
    $scope.deleteStudent = function (student) {
        var promise = $http.delete('/data/api/classes/' + $routeParams.id + '/students/' + student.id);
        promise.success(function(data, status, headers, config){
            if (status == 200){
                $scope.students.splice($scope.students.indexOf(student), 1)
		        console.log("Student deleted.");
            } else {
				console.log("Unable to delete the student.");
            }
        });
    }
});