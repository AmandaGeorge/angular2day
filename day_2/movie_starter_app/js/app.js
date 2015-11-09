var app = angular.module("movieApp", []);

app.directive("movieDirective", function() {
	return {
		templateUrl: "templates/movie-dir.html",
		controller: "movieCtrl"
	};
});

app.factory("Movie", function($http) {
	var factory = {};

	factory.search = function(title) {
		return $http.get("http://www.omdbapi.com/?t=" + title);
	};

	return factory;
});

app.controller("movieCtrl", function($scope, Movie) {
	$scope.clickSearch = false;

	$scope.searchMovies = function() {
		Movie.search($scope.searchTitle)
			.success(function(movie) {
				$scope.searchTitle = "";
				$scope.movie = movie;
				console.log($scope.movie);
				$scope.clickSearch = true;
			})
			.error(function() {
				alert("Error searching movies");
			});
	};

	$scope.resetSearch = function() {
		$scope.clickSearch = false;
		$scope.searchQuery = "";
	};

});