var app = angular.module("wineApp", []);

app.controller("mainCtrl", function($scope, $http) {
	function getWines() {
		$http.get("http://daretodiscover.herokuapp.com/wines")
			.success(function(wines) {
				$scope.wines = wines;
			})
			.error(function() {
				alert("Error retrieving wines");
			});
	};
	getWines();

	$scope.saveWine = function() {
		$http.post("http://daretodiscover.herokuapp.com/wines", $scope.wineData)
			.success(function() {
				$scope.wineData = "";
				getWines();
			})
			.error(function() {
				alert("Error saving new wine");
			});
	};
});