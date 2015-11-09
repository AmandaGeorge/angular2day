var app = angular.module("myApp", ["ngRoute", "ngAnimate", "ngResource"]);

// custom directive
app.directive("testDirective", function() {
	return {
		templateUrl: "templates/directives/test-dir.html",
		controller: "directiveCtrl"
	}
});

// controller for custom directive
app.controller("directiveCtrl", function($scope) {
	$scope.sayHello = function() {
		alert("Hello World!");
	}
});

// the word factory here is NOT taco
app.factory("testFactory", function() {
	// the word factory in this context is taco; this creates an object-literal
	var factory = {};

	// the word factory is taco here as well
	factory.helloWorld = function() {
		alert("Hello World!");
	};

	return factory;
});

// capitalize the U to set it up well for use in the model
// app.factory("User", function($http) {
// 	var factory = {};

// 	factory.getAll = function() {
// 		return $http.get("http://daretodiscover.herokuapp.com/users");
// 	};

// 	factory.newUser = function(data) {
// 		return $http.post("http://daretodiscover.herokuapp.com/users", data);
// 	};

// 	return factory;
// });

app.factory("User", function($resource) {
	return $resource("http://daretodiscover.herokuapp.com/users/:id", {
		id: "@id"
	}, {
		update: {
			method: "PUT"
		}
	});
});

app.config(["$routeProvider", function($routeProvider) {
	$routeProvider
		.when("/page1", {
			templateUrl: "templates/page1.html",
			controller: "testCtrl"
		})
		.when("/page2/:name", {
			templateUrl: "templates/page2.html",
			controller: "page2Ctrl"
		})
		.otherwise({
			redirectTo: "/page1"
		});
}]);

// inject angular services and any necessary factories into the controller
app.controller("testCtrl", function($scope, testFactory, User) {
	$scope.userText = "Hello World!";

	testFactory.helloWorld();

	// promise - GET request to retrieve users from API
	function getUsers() {
		// this $http get request gets moved to the factory to modularize the code
		// $http.get("http://daretodiscover.herokuapp.com/users")
		// use the User factory instead
		// User.getAll()
		// 	// success of promise
		// 	.success(function(users) {
		// 		$scope.users = users;
		// 	})
		// 	// rejection of promise
		// 	.error(function() {
		// 		alert("Error getting users");
		// 	});

		// alternative way using $resource
		// query takes two callbacks, one for success and one for error
		User.query(function(users) {
			$scope.users = users;
		}, function() {
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
		// push new user into users array
		// $scope.users.push({
		// 	firstname: $scope.firstname,
		// 	lastname: $scope.lastname,
		// 	age: $scope.age,
		// 	username: $scope.username
		// });
		console.log($scope.userData);

		// User.newUser($scope.userData)
		// 	.success(function() {
		// 		getUsers();
		// 	})
		// 	.error(function() {
		// 		alert("Error creating user");
		// 	})
	
		// have to use the methods provided by ngResource, so need to use .save instead of .newUser
		User.save($scope.userData, function() {
			$scope.userData = "";
			getUsers();
		}, function() {
			alert("Error!");
		});
	};
});

app.controller("page2Ctrl", function($scope, $routeParams) {
	$scope.name = $routeParams.name;
});
