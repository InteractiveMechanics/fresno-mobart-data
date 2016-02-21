mobart.controller('AddClassController', function($scope, $rootScope, $routeParams, $http, $location){

    $http
        .get($rootScope.baseUrl + '/api/teachers')
        .success(function(response) {
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
	        console.log(response);
            $scope.semesters = response;
    });

    $scope.saveClass = function() {
	    //console.log($scope.selected_semester);
        var promise = $http.post($rootScope.baseUrl + '/api/classes', $scope.classDetails[0]);
        promise.success(function(data, status, headers, config){
            if (status == 200){
		        console.log("Class created.");
		        
		        var obj = {
			      'cid': data,
			      'semid': $scope.selected_semester
		        };
		        
		        var promise = $http.post($rootScope.baseUrl + '/api/semester_class', obj);
		        promise.success(function(data, status, headers, config){
					if (status == 200){
						$location.path('/classes');
					}
				});
		        //alert(data);
                //$location.path('/classes');
            } else {
				console.log("Unable to create the class.");
            }
        });
        promise.error(function(data, status, headers, config){
            console.log("Unable to create the class.");
        });
    };
    $scope.updateStudent = function (student) {
        var promise = $http.put($rootScope.baseUrl + '/api/classes/' + $routeParams.id + '/students/' + student.id, student);
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
        var promise = $http.post($rootScope.baseUrl + '/api/classes/' + $routeParams.id + '/students', $scope.newStudent);
        promise.success(function(data, status, headers, config){
            if (status == 200){
		        console.log("Student created.");
                $scope.students.splice($scope.students.indexOf(student), 0, $scope.newStudent);
            } else {
				console.log("Unable to create the student.");
            }
        });
        promise.error(function(data, status, headers, config){
            console.log("Unable to create the student.");
        });
    }
    $scope.deleteStudent = function (student) {
        var promise = $http.delete($rootScope.baseUrl + '/api/classes/' + $routeParams.id + '/students/' + student.id);
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