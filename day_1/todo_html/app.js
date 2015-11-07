var app = angular.module("myApp", []);

app.controller("mainCtrl", function($scope, $http) {
	$scope.todos = [
		{
			id: 0,
			description: "I want to go shopping"
		},
		{
			id: 1,
			description: "Clean the house"
		}
	];
	var todoId = 2;

	$scope.submitTodo = function() {
		$scope.todos.push({
			description: $scope.description
		});
		// to clear out the form
		$scope.todoText = "";
		// to increment the Id counter
		todoId++;
	};

	$scope.deleteTodo = function(event, index) {
		var deletedTodos = [];
		
	}
});