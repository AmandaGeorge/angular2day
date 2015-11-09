var app = angular.module("wineApp", ["ngRoute", "ngAnimate", "ngResource"]);

// app.factory("Wine", function($http) {
// 	var factory = {};

// 	factory.getAll = function() {
// 		return $http.get("http://daretodiscover.herokuapp.com/wines");
// 	};

// 	factory.save = function(data) {
// 		return $http.post("http://daretodiscover.herokuapp.com/wines", data);
// 	};

// 	factory.getOne = function(id) {
// 		return $http.get("http://daretodiscover.herokuapp.com/wines/" + id);
// 	};

// 	factory.update = function(id, data) {
// 		return $http.put("http://daretodiscover.herokuapp.com/wines/" + id, data);
// 	};

// 	return factory;
// });

app.factory("Wine", function($resource) {
	return $resource("http://daretodiscover.herokuapp.com/wines/:id", {
		id: "@id"
	}, {
		update: {
			method: "PUT"
		}
	});
});

app.config(["$routeProvider", function($routeProvider) {
	$routeProvider
		.when("/", {
			templateUrl: "templates/main.html",
			controller: "mainCtrl"
		})
		.when("/edit/:id", {
			templateUrl: "templates/edit.html",
			controller: "editCtrl"
		})
		.otherwise({
			redirectTo: "/"
		});
}]);

app.controller("mainCtrl", function($scope, Wine) {
	function getWines() {
		// Wine.getAll()
		// 	.success(function(wines) {
		// 		$scope.wines = wines;
		// 		console.log($scope.wines);
		// 	})
		// 	.error(function() {
		// 		alert("Error retrieving wines");
		// 	});
		
		Wine.query(function(wines) {
			$scope.wines = wines;
		}, function() {
			alert("Error retrieving wines");
		});
	};
	getWines();

	$scope.saveWine = function() {
		// Wine.save($scope.wineData)
		// 	.success(function() {
		// 		$scope.wineData = "";
		// 		getWines();
		// 	})
		// 	.error(function() {
		// 		alert("Error saving new wine");
		// 	});

		Wine.save($scope.wineData, function() {
			$scope.wineData = "";
			getWines();
		}, function() {
			alert("Error saving new wine");
		});
	};
});

app.controller("editCtrl", function($scope, $routeParams, $location, Wine) {
	// Wine.getOne($routeParams.id)
	// 	.success(function(wine) {
	// 		$scope.wine = wine;
	// 	})
	// 	.error(function() {
	// 		alert("Error editing wine");
	// 	});

	// alternative using $resource factory
	Wine.get({ id: $routeParams.id }, function(wine) {
		$scope.wine = wine;
	}, function() {
		alert("Error editing wine");
	});

	$scope.submitEdits = function() {
		// Wine.update($routeParams.id, $scope.wine)
		// 	.success(function() {
		// 		$location.path("/");
		// 	})
		// 	.error(function() {
		// 		console.log("Error updating wine.");
		// 	});

		Wine.update({ id: $routeParams.id }, $scope.wine, function() {
			$location.path("/");
		}, function() {
			alert("Error updating wine");
		});
	};
});