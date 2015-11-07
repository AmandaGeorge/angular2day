var app = angular.module("myApp", []);

app.controller("testCtrl", function($scope, $http) {
	$scope.userText = "Hello World!";

	// promise - GET request to retrieve users from API
	function getUsers() {
		$http.get("http://daretodiscover.herokuapp.com/users")
			// success of promise
			.success(function(users) {
				$scope.users = users;
			})
			// rejection of promise
			.error(function() {
				alert("Error getting users");
			});
	};

	getUsers();

	// hard-coded JSON data
	// $scope.users = [
	// 	{
	// 		firstname: "Bob",
	// 		lastname: "Jones",
	// 		age: 20,
	// 		username: "bjones"
	// 	},
	// 	{
	// 		firstname: "Holly",
	// 		lastname: "Smith",
	// 		age: 30,
	// 		username: "hsmith"
	// 	}
	// ];

	$scope.submitUser = function() {
		// $scope.users.push({
		// 	firstname: $scope.firstname,
		// 	lastname: $scope.lastname,
		// 	age: $scope.age,
		// 	username: $scope.username
		// });
		console.log($scope.userData);

		$http.post("http://daretodiscover.herokuapp.com/users", $scope.userData)
			.success(function() {
				getUsers();
			})
			.error(function() {
				alert("Error creating user");
			})
	};
});