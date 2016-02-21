mobart.controller('EditClassController', function($scope, $rootScope, $routeParams, $http, $location){
    $scope.editable = true;
    $http
        .get($rootScope.baseUrl + '/api/classes/' + $routeParams.id + '/students')
        .success(function(response) {
            $scope.students = response;
    });
    $http
        .get($rootScope.baseUrl + '/api/projects')
        .success(function(response) {
            $scope.projects = response;
    });
    $http
        .get($rootScope.baseUrl + '/api/teachers')
        .success(function(response) {
            $scope.teachers = response;
    });
    
    $http
        .get($rootScope.baseUrl + '/api/semesters')
        .success(function(response) {
	        $scope.semesters = response;
    });
    
    $http
        .get($rootScope.baseUrl + '/api/semester_class/' + $routeParams.id)
        .success(function(response) {
	        console.log(response);
            $scope.semester_id = response;
            if($scope.semester_id.length > 0) {
	            $scope.selected_semester = $scope.semester_id[0].semid;
            }
    });
    
    
    $http
        .get($rootScope.baseUrl + '/api/classes/' + $routeParams.id)
        .success(function(response) {
            $scope.classDetails = response;
    });
    

    $scope.saveClass = function () {
        var promise = $http.put($rootScope.baseUrl + '/api/classes/' + $routeParams.id, $scope.classDetails[0]);
        promise.success(function(data, status, headers, config){
            if (status == 200){
		        console.log("Class updated.");  
		        var obj = {
			      'cid': $routeParams.id,
			      'semid': $scope.selected_semester
		        };
		        
		        if($scope.semester_id.length > 0) {
			        //If it exist then Update Query
			        var promise = $http.put($rootScope.baseUrl + '/api/semester_class/' + $routeParams.id, obj);
			        promise.success(function(data, status, headers, config){
						if (status == 200){
							$location.path('/classes');
						}
					});   
	            } else {
		            //Else Insert Query
		            if($scope.selected_semester) {
			            var promise = $http.post($rootScope.baseUrl + '/api/semester_class', obj);
				        promise.success(function(data, status, headers, config){
							if (status == 200){
								$location.path('/classes');
							}
						});
					} else {
						$location.path('/classes');
					}
	            }
            } else {
				console.log("Unable to update the class.");
            }
        });
    }
    
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
                $http
                    .get($rootScope.baseUrl + '/api/classes/' + $routeParams.id + '/students')
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